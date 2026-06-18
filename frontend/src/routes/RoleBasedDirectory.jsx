import { useAuth } from "../context/AuthContext";

import Directory from "../pages/Directory/Directory";
import AdminDirectory from "../pages/Admin/AdminDirectory/AdminDirectory";

export default function RoleBasedDirectory() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return user.role === "admin"
    ? <AdminDirectory />
    : <Directory />;
}