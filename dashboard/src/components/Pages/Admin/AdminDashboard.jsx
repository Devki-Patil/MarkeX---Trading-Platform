import AdminStats from "./AdminStats";
import AdminOrders from "./AdminOrders";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <AdminStats />
      <AdminOrders />
    </div>
  );
}
