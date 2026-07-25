# EdgeTrade – Stock Trading Platform

A full-stack paper-trading platform inspired by Zerodha. Users sign up, get ₹1,00,000 in virtual funds, and can buy/sell stocks with live portfolio, orders, positions, and funds tracking.

## Features

- **Auth** – JWT-based signup/login with bcrypt-hashed passwords
- **Trading** – Buy and sell orders with server-side validation (funds check, share-count check, weighted average cost basis)
- **Portfolio** – Holdings, positions, orders history, and funds pages all backed by MongoDB and scoped per user
- **Funds** – Virtual money: deducted on buy, credited on sell, top-up supported
- **Landing site** – Marketing pages (home, about, products, pricing, support) with the signup/login flow that hands off to the dashboard

## Architecture

| App         | Stack                              | Deployed on   |
| ----------- | ---------------------------------- | ------------- |
| `frontend/` | React (landing pages + auth)       | Vercel        |
| `dashboard/`| React + MUI (trading dashboard)    | Vercel        |
| `backend/`  | Node.js + Express + Mongoose (API) | Render        |
| Database    | MongoDB                            | MongoDB Atlas |

Login flow: the landing app authenticates against the API, then redirects to the dashboard with the JWT (`dashboard/?token=...`). The dashboard stores it and sends it as a `Bearer` header on every request; any 401 bounces the user back to the login page.

## Local development

```bash
# 1. API (choose one)
cd backend
npm install
npm run dev:local        # zero-setup: runs against a throwaway in-memory MongoDB
# — or, with a real database —
cp .env.example .env     # fill in MONGO_URL
npm run dev

# 2. Landing app → http://localhost:3000
cd frontend && npm install && npm start

# 3. Dashboard → http://localhost:3001
cd dashboard && npm install && npm start
```

Sign up at http://localhost:3000/signup — you'll be redirected into the dashboard.

## Deployment (all free tier)

### 1. MongoDB Atlas
1. Create a free **M0** cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user, and under *Network Access* allow `0.0.0.0/0` (Render's IPs vary)
3. Copy the connection string; add `/edgetrade` as the database name

### 2. Backend on Render
1. Push this repo to GitHub
2. In [Render](https://render.com): **New → Blueprint**, pick this repo (`render.yaml` configures everything)
3. Set env vars when prompted:
   - `MONGO_URL` – the Atlas connection string
   - `CORS_ORIGINS` – your two Vercel URLs, comma-separated (add after step 3)
4. Note the API URL, e.g. `https://edgetrade-api.onrender.com`

### 3. Frontend + Dashboard on Vercel
Create **two** Vercel projects from the same repo:

| Project    | Root directory | Env vars                                                       |
| ---------- | -------------- | -------------------------------------------------------------- |
| landing    | `frontend`     | `REACT_APP_API_URL`, `REACT_APP_DASHBOARD_URL`                 |
| dashboard  | `dashboard`    | `REACT_APP_API_URL`, `REACT_APP_LANDING_URL`                   |

Then go back to Render and set `CORS_ORIGINS` to both Vercel URLs (no trailing slashes), e.g.:

```
https://edgetrade-landing.vercel.app,https://edgetrade-dashboard.vercel.app
```

> **Note:** Render's free tier sleeps after 15 min idle — the first request after that takes ~30–60 s. The login page shows a loading state while it wakes.

## API overview

| Method | Route          | Auth | Description                                   |
| ------ | -------------- | ---- | --------------------------------------------- |
| POST   | `/signup`      | –    | Create account (seeds demo portfolio + funds) |
| POST   | `/login`       | –    | Returns JWT                                   |
| GET    | `/verify`      | ✓    | Validate token                                |
| GET    | `/allHoldings` | ✓    | User's holdings                               |
| GET    | `/allPositions`| ✓    | User's positions                              |
| GET    | `/orders`      | ✓    | Order history (newest first)                  |
| POST   | `/newOrder`    | ✓    | Execute a BUY/SELL order                      |
| GET    | `/funds`       | ✓    | Available funds + invested amount             |
| POST   | `/funds/add`   | ✓    | Top up virtual funds                          |
