import { useEffect, useState } from "react";
import api from "../../../api/axios";

import AdminDashboardHeader from "./AdminDashboardHeader";
import AdminDashboardStats from "./AdminDashboardStats";
import AdminDashboardQuickActions from "./AdminDashboardQuickActions";
import AdminRecentEmployees from "./AdminRecentEmployees";
import AdminPendingLeaves from "./AdminPendingLeaves";

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [
        employeeRes,
        departmentRes,
        leaveRes,
      ] = await Promise.all([
        api.get("/auth/users"),
        api.get("/dept/get"),
        api.get("/leave/all"),
      ]);

      setEmployees(employeeRes.data);
      setDepartments(departmentRes.data);
      setLeaves(leaveRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="flex-1 p-8">
      <div className="space-y-6">

        <AdminDashboardHeader />

        <AdminDashboardStats
          employees={employees}
          departments={departments}
          leaves={leaves}
        />

        <AdminDashboardQuickActions />

        <div className="grid gap-6 xl:grid-cols-2">

          <AdminPendingLeaves
            leaves={leaves}
          />

          <AdminRecentEmployees
            employees={employees}
          />

        </div>

      </div>
    </main>
  );
}