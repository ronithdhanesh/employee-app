import { useAuth } from "../context/AuthContext";

import Dashboard from "../pages/Dashboard/Dashboard";
import AdminDashboard from "../pages/Admin/AdminDashBoard/AdminDashboard";

export default function RoleBasedDashboard() {
    const { user, loading } = useAuth()

    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      );
    }

    if (!user) return null;

    return user.role === "admin" ? <AdminDashboard /> : <Dashboard />
}