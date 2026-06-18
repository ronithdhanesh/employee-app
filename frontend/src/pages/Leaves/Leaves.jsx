import { useEffect, useState } from "react";
import api from "../../api/axios"
import LeaveStats from "./LeaveStats";
import LeaveRequestForm from "./LeaveRequestForm";
import LeaveHistory from "./LeaveHistory";

export default function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaves();
  }, []);

  async function fetchLeaves() {
    setIsLoading(true);
    setError("");

    const endpoints = [
      "/leave/my-leaves",
      // "/leave/team",
      // "/leave/all",
    ];

    for (const endpoint of endpoints) {
      try {
        const res = await api.get(endpoint);
        setLeaves(res.data);
        setIsLoading(false);
        return;
      } catch (err) {
        const status = err.response?.status;
        const message = err.response?.data?.message || "";

        if (
          status === 401 ||
          status === 403 ||
          status === 404 ||
          message.includes("Employee record not found")
        ) {
          continue;
        }

        setError(
          message || "Unable to load leave requests."
        );
        setIsLoading(false);
        return;
      }
    }

    setError(
      "You do not have access to view leave requests."
    );
    setIsLoading(false);
  }

  return (
    <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Leaves</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Apply for leave and track your requests.
          </p>
        </div>

        <LeaveStats leaves={leaves} />

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-1">
            <LeaveRequestForm
              // onLeaveApplied={fetchLeaves}
            />
          </div>

          <div className="xl:col-span-2">
            {isLoading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900">
                Loading leave history...
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm dark:border-red-900 dark:bg-red-900/30 dark:text-red-200">
                {error}
              </div>
            ) : (
              <LeaveHistory leaves={leaves} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}