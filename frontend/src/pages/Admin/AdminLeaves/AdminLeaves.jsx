import { useEffect, useState } from "react";
import api from "../../../api/axios";

import AdminLeaveStats from "./AdminLeaveStats";
import AdminLeaveFilters from "./AdminLeaveFilters";
import LeaveApprovalTable from "./LeaveApprovalTable";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchLeaves();
  }, []);

  async function fetchLeaves() {
    try {
      setLoading(true);

      const res = await api.get("/leave/all");

      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredLeaves = leaves.filter((leave) => {
    const employeeName =
      leave.employee?.name?.toLowerCase() || "";

    const matchesSearch =
      employeeName.includes(
        searchQuery.toLowerCase()
      );

    const matchesStatus =
      statusFilter === "All" ||
      leave.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="flex-1 p-8">
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Leave Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage employee leave requests.
          </p>
        </div>

        <AdminLeaveStats leaves={leaves} />

        <AdminLeaveFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <LeaveApprovalTable
          leaves={filteredLeaves}
          loading={loading}
          onRefresh={fetchLeaves}
        />

      </div>
    </main>
  );
}