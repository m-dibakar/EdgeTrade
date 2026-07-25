import React, { useState, useContext } from "react";

import GeneralContext from "./GeneralContext";
import api from "../api";
import { watchlist } from "../data/data";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const { closeTradeWindow } = useContext(GeneralContext);
  const watchlistStock = watchlist.find((s) => s.name === uid);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(
    watchlistStock ? watchlistStock.price : 0.0
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isBuy = mode === "BUY";
  const marginRequired = (Number(stockQuantity) * Number(stockPrice) || 0).toFixed(2);

  const handleOrderClick = async () => {
    setError("");
    setSubmitting(true);
    try {
      await api.post("/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode,
      });
      closeTradeWindow(true);
    } catch (err) {
      setError(
        (err.response && err.response.data && err.response.data.error) ||
          "Order failed, please try again"
      );
      setSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    closeTradeWindow(false);
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <h4 className="trade-window-title">
        {isBuy ? "Buy" : "Sell"} {uid}
      </h4>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      {error && <p className="trade-error">{error}</p>}

      <div className="buttons">
        <span>
          {isBuy ? "Margin required" : "You receive"} ₹{marginRequired}
        </span>
        <div>
          <button
            className={`btn ${isBuy ? "btn-blue" : "btn-orange"}`}
            onClick={handleOrderClick}
            disabled={submitting}
          >
            {submitting ? "Placing…" : isBuy ? "Buy" : "Sell"}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
