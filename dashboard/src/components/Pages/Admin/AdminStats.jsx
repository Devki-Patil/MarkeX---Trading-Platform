import { useEffect, useState } from "react";
import api from "../../../Services/AxiosInstance"

export default function AdminStats() {
  const [stats, setStats] = useState({ users: 0, orders: 0 });

  useEffect(() => {
    api.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Platform Stats</h2>
      <p>Total Users: {stats.users}</p>
      <p>Total Orders: {stats.orders}</p>
    </div>
  );
}
