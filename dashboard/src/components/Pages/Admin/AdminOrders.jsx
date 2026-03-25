import { useEffect, useState } from "react";
import api from "../../../Services/AxiosInstance"

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
  api.get("/admin/orders")
    .then(res => {
      console.log("ADMIN ORDERS RESPONSE:", res.data);
      setOrders(res.data);
    })
    .catch(err => {
      console.error("ADMIN ORDERS ERROR:", err.response?.data || err.message);
    });
}, []);


  return (
    <div>
      <h2>All Users Orders</h2>

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Instrument</th>
            <th>Side</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o.userId?.email}</td>
              <td>{o.instrument}</td>
              <td>{o.side}</td>
              <td>{o.qty}</td>
              <td>{o.price}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
