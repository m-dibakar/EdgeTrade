import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { refreshTick } = useContext(GeneralContext);

  useEffect(() => {
    api.get("/orders").then((res) => {
      setOrders(res.data);
      setLoaded(true);
    });
  }, [refreshTick]);

  if (loaded && orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>

      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </td>
                <td className={order.mode === "BUY" ? "profit" : "loss"}>
                  {order.mode}
                </td>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{Number(order.price).toFixed(2)}</td>
                <td>{(order.qty * order.price).toFixed(2)}</td>
                <td>{order.status || "EXECUTED"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
