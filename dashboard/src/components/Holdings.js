import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";

const fmt = (n) =>
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { refreshTick, openTradeWindow } = useContext(GeneralContext);

  useEffect(() => {
    api.get("/allHoldings").then((res) => {
      setAllHoldings(res.data);
    });
  }, [refreshTick]);

  const investment = allHoldings.reduce((sum, h) => sum + h.avg * h.qty, 0);
  const currentValue = allHoldings.reduce((sum, h) => sum + h.price * h.qty, 0);
  const pnl = currentValue - investment;
  const pnlPct = investment > 0 ? (pnl / investment) * 100 : 0;

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th></th>
            </tr>
            {allHoldings.map((stock, index) => {
              const currValue = stock.price * stock.qty;
              const isProfit = currValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{currValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(currValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                  <td>
                    <button
                      className="holdings-sell-btn"
                      onClick={() => openTradeWindow(stock.name, "SELL")}
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{fmt(investment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{fmt(currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={pnl >= 0 ? "profit" : "loss"}>
            {fmt(pnl)} ({pnl >= 0 ? "+" : ""}
            {pnlPct.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
