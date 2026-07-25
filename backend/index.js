require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UsersModel } = require("./model/UsersModel");
const { signToken, requireAuth } = require("./middleware/auth");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(uri);
}

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
);
app.use(express.json());

const pct = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

const DEMO_HOLDINGS = [
  { name: "RELIANCE", qty: 4, avg: 2193.7, price: 2288.45 },
  { name: "INFY", qty: 6, avg: 1350.5, price: 1455.45 },
  { name: "TATAPOWER", qty: 20, avg: 104.2, price: 124.15 },
];

const DEMO_POSITIONS = [
  { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35 },
];

async function seedDemoData(userId) {
  await HoldingsModel.insertMany(
    DEMO_HOLDINGS.map((h) => ({
      ...h,
      userId,
      net: pct(((h.price - h.avg) / h.avg) * 100),
      day: pct((Math.random() - 0.4) * 3),
    }))
  );
  await PositionsModel.insertMany(
    DEMO_POSITIONS.map((p) => ({
      ...p,
      userId,
      net: pct(((p.price - p.avg) / p.avg) * 100),
      day: pct((Math.random() - 0.4) * 3),
      isLoss: p.price < p.avg,
    }))
  );
}

// ---------- health ----------
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "EdgeTrade API" });
});

// ---------- auth ----------
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    const existing = await UsersModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UsersModel.create({ username, email, passwordHash });
    await seedDemoData(user._id);
    const token = signToken(user);
    res.status(201).json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed, please try again" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await UsersModel.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = signToken(user);
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed, please try again" });
  }
});

app.get("/verify", requireAuth, async (req, res) => {
  const user = await UsersModel.findById(req.user.id);
  if (!user) return res.status(401).json({ error: "User not found" });
  res.json({ user: { username: user.username, email: user.email } });
});

// ---------- portfolio ----------
app.get("/allHoldings", requireAuth, async (req, res) => {
  const allHoldings = await HoldingsModel.find({ userId: req.user.id });
  res.json(allHoldings);
});

app.get("/allPositions", requireAuth, async (req, res) => {
  const allPositions = await PositionsModel.find({ userId: req.user.id });
  res.json(allPositions);
});

app.get("/orders", requireAuth, async (req, res) => {
  const orders = await OrdersModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

// ---------- funds ----------
app.get("/funds", requireAuth, async (req, res) => {
  const user = await UsersModel.findById(req.user.id);
  if (!user) return res.status(401).json({ error: "User not found" });
  const holdings = await HoldingsModel.find({ userId: req.user.id });
  const invested = holdings.reduce((sum, h) => sum + h.avg * h.qty, 0);
  res.json({ available: user.funds, invested });
});

app.post("/funds/add", requireAuth, async (req, res) => {
  const amount = Number(req.body.amount);
  if (!Number.isFinite(amount) || amount <= 0 || amount > 1000000) {
    return res.status(400).json({ error: "Enter an amount between 1 and 10,00,000" });
  }
  const user = await UsersModel.findByIdAndUpdate(
    req.user.id,
    { $inc: { funds: amount } },
    { new: true }
  );
  res.json({ available: user.funds });
});

// ---------- orders ----------
app.post("/newOrder", requireAuth, async (req, res) => {
  try {
    const { name, mode } = req.body;
    const qty = Number(req.body.qty);
    const price = Number(req.body.price);

    if (!name || !["BUY", "SELL"].includes(mode)) {
      return res.status(400).json({ error: "Invalid order" });
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive whole number" });
    }
    if (!Number.isFinite(price) || price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    const user = await UsersModel.findById(req.user.id);
    if (!user) return res.status(401).json({ error: "User not found" });

    const cost = qty * price;
    const holding = await HoldingsModel.findOne({ userId: req.user.id, name });

    if (mode === "BUY") {
      if (user.funds < cost) {
        return res.status(400).json({
          error: `Insufficient funds: need ₹${cost.toFixed(2)}, available ₹${user.funds.toFixed(2)}`,
        });
      }
      if (holding) {
        const newQty = holding.qty + qty;
        holding.avg = (holding.avg * holding.qty + cost) / newQty;
        holding.qty = newQty;
        holding.price = price;
        holding.net = pct(((price - holding.avg) / holding.avg) * 100);
        await holding.save();
      } else {
        await HoldingsModel.create({
          userId: req.user.id,
          name,
          qty,
          avg: price,
          price,
          net: "+0.00%",
          day: "+0.00%",
        });
      }
      user.funds -= cost;
    } else {
      if (!holding || holding.qty < qty) {
        return res.status(400).json({
          error: `Not enough shares to sell: you hold ${holding ? holding.qty : 0} ${name}`,
        });
      }
      if (holding.qty === qty) {
        await holding.deleteOne();
      } else {
        holding.qty -= qty;
        holding.price = price;
        holding.net = pct(((price - holding.avg) / holding.avg) * 100);
        await holding.save();
      }
      user.funds += cost;
    }

    await user.save();

    // reflect today's trade in positions
    const position = await PositionsModel.findOne({ userId: req.user.id, name });
    const signedQty = mode === "BUY" ? qty : -qty;
    if (position) {
      position.qty += signedQty;
      if (position.qty === 0) {
        await position.deleteOne();
      } else {
        position.price = price;
        position.net = pct(((price - position.avg) / position.avg) * 100);
        position.isLoss = price < position.avg;
        await position.save();
      }
    } else {
      await PositionsModel.create({
        userId: req.user.id,
        product: "CNC",
        name,
        qty: signedQty,
        avg: price,
        price,
        net: "+0.00%",
        day: "+0.00%",
        isLoss: false,
      });
    }

    const order = await OrdersModel.create({
      userId: req.user.id,
      name,
      qty,
      price,
      mode,
    });

    res.status(201).json({ message: "Order executed", order, funds: user.funds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed, please try again" });
  }
});

main()
  .then(() => {
    console.log("DB connected successfully...");
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
