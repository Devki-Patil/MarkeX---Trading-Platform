import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Pages/Dashboard/Dashboard";
import RightBar from "./components/Layouts/RightBar";
import Orders from "./components/Pages/Dashboard/Orders";
import Holdings from "./components/Pages/Dashboard/Holdings";
import Positions from "./components/Pages/Dashboard/Positions";
import Funds from "./components/Pages/Dashboard/Funds";
import NotFound from "./NotFound";

import Login from "./components/Pages/Auth/Login";
import Signup from "./components/Pages/Auth/SignUp";
import ProtectedRoute from "./components/Protected";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import AdminDashboard from "../src/components/Pages/Admin/AdminDashboard";

import ProfilePage from "./components/Pages/Profile/ProfilePage";
import ConsolePage from "./components/ConsolePage";
import SettingsPage from "./components/SettingPage";

export default function App() {
  return (
    <Routes>

  {/* REDIRECT */}
  <Route path="/" element={<Navigate to="/dashboard" />} />

  {/* PUBLIC */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* ADMIN */}
  <Route
    path="/admin"
    element={
      <RoleProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </RoleProtectedRoute>
    }
  />

  <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/console"
        element={
          <ProtectedRoute>
            <ConsolePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />


  {/* DASHBOARD */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  >
    <Route index element={<RightBar />} />
    <Route path="orders" element={<Orders />} />
    <Route path="holdings" element={<Holdings />} />
    <Route path="positions" element={<Positions />} />
    <Route path="funds" element={<Funds />} />
  </Route>

  

  {/* 404 */}
  <Route path="*" element={<NotFound />} />

</Routes>
  );
}