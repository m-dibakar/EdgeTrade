const { Schema } = require("mongoose");

const UsersSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  funds: { type: Number, default: 100000 },
  createdAt: { type: Date, default: () => new Date() },
});

module.exports = { UsersSchema };
