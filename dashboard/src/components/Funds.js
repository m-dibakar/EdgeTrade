import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";

const fmt = (n) =>
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Funds = () => {
  const [funds, setFunds] = useState({ available: 0, invested: 0 });
  const [message, setMessage] = useState("");
  const { refreshTick } = useContext(GeneralContext);

  const loadFunds = () => {
    api.get("/funds").then((res) => setFunds(res.data));
  };

  useEffect(loadFunds, [refreshTick]);

  const handleAddFunds = async () => {
    const input = window.prompt("Amount to add (₹1 – ₹10,00,000):", "10000");
    if (input === null) return;
    const amount = Number(input);
    try {
      const res = await api.post("/funds/add", { amount });
      setFunds((f) => ({ ...f, available: res.data.available }));
      setMessage(`₹${fmt(amount)} added successfully`);
    } catch (err) {
      setMessage(
        (err.response && err.response.data && err.response.data.error) ||
          "Could not add funds"
      );
    }
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button className="btn btn-green" onClick={handleAddFunds}>
          Add funds
        </button>
      </div>

      {message && <p style={{ textAlign: "center", color: "#4184f3" }}>{message}</p>}

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{fmt(funds.available)}</p>
            </div>
            <div className="data">
              <p>Used margin (invested)</p>
              <p className="imp">{fmt(funds.invested)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{fmt(funds.available)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Total account value</p>
              <p>{fmt(funds.available + funds.invested)}</p>
            </div>
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button className="btn btn-blue">Open Account</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
