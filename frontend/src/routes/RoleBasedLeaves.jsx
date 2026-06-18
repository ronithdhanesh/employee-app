import { useAuth } from "../context/AuthContext";

import Leaves from "../pages/Leaves/Leaves";
import AdminLeaves from "../pages/Admin/AdminLeaves/AdminLeaves"

export default function RoleBasedLeaves() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return user.role === "admin"
    ? <AdminLeaves />
    : <Leaves />;
}