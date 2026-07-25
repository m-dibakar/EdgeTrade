const {Schema} = require('mongoose');

const OrdersSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user", index: true },
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    status: { type: String, default: "EXECUTED" },
    createdAt: { type: Date, default: () => new Date() },
});

module.exports = {OrdersSchema};