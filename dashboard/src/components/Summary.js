import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";

const k = (n) => `${(Number(n || 0) / 1000).toFixed(2)}k`;

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [funds, setFunds] = useState({ available: 0, invested: 0 });
  const { refreshTick } = useContext(GeneralContext);
  const username = localStorage.getItem("username") || "Trader";

  useEffect(() => {
    api.get("/allHoldings").then((res) => setHoldings(res.data));
    api.get("/funds").then((res) => setFunds(res.data));
  }, [refreshTick]);

  const investment = holdings.reduce((sum, h) => sum + h.avg * h.qty, 0);
  const currentValue = holdings.reduce((sum, h) => sum + h.price * h.qty, 0);
  const pnl = currentValue - investment;
  const pnlPct = investment > 0 ? (pnl / investment) * 100 : 0;
  const isProfit = pnl >= 0;

  return (
    <>
      <div className="username">
        <h6>Hi, {username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{k(funds.available)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{k(funds.invested)}</span>{" "}
            </p>
            <p>
              Account value <span>{k(funds.available + funds.invested)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {k(pnl)}{" "}
              <small>
                {isProfit ? "+" : ""}
                {pnlPct.toFixed(2)}%
              </small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{k(currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{k(investment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
