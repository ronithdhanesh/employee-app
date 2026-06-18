import api from "../../../api/axios";
import { useState } from "react";

export default function LeaveApprovalTable({
  leaves,
  loading,
  onRefresh,
}) {
  const [approvalLoading, setApprovalLoading] = useState(null);

  async function approveLeave(id) {
    try {
      setApprovalLoading(id);
      await api.patch(
        `/leave/${id}/approve`
      );

      onRefresh();
    } catch (err) {
      console.log(err);
    } finally {
      setApprovalLoading(null);
    }
  }

  async function rejectLeave(id) {
    try {
      setApprovalLoading(id);
      await api.patch(
        `/leave/${id}/reject`
      );

      onRefresh();
    } catch (err) {
      console.log(err);
    } finally {
      setApprovalLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">

      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-200 dark:border-slate-700">

            <th className="py-3 text-left text-slate-900 dark:text-slate-100">
              Employee
            </th>

            <th className="py-3 text-left text-slate-900 dark:text-slate-100">
              Leave Type
            </th>

            <th className="py-3 text-left text-slate-900 dark:text-slate-100">
              Dates
            </th>

            <th className="py-3 text-left text-slate-900 dark:text-slate-100">
              Status
            </th>

            <th className="py-3 text-left text-slate-900 dark:text-slate-100">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {leaves.map((leave) => (

            <tr
              key={leave._id}
              className="border-b border-slate-200 dark:border-slate-700"
            >

              <td className="py-4 text-slate-900 dark:text-slate-100">
                {leave.employee?.name}
              </td>

              <td className="py-4 text-slate-900 dark:text-slate-100">
                {leave.leaveType}
              </td>

              <td className="py-4 text-slate-900 dark:text-slate-100">
                {new Date(
                  leave.startDate
                ).toLocaleDateString()}
                {" - "}
                {new Date(
                  leave.endDate
                ).toLocaleDateString()}
              </td>

              <td className="py-4">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    leave.status === "Approved"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                      : leave.status ===
                        "Rejected"
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200"
                  }`}
                >
                  {leave.status}
                </span>

              </td>

              <td className="py-4">

                {leave.status ===
                  "Pending" && (
                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        approveLeave(
                          leave._id
                        )
                      }
                      disabled={approvalLoading !== null}
                      className="cursor-pointer rounded-xl bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {approvalLoading === leave._id ? "Loading..." : "Approve"}
                    </button>

                    <button
                      onClick={() =>
                        rejectLeave(
                          leave._id
                        )
                      }
                      disabled={approvalLoading !== null}
                      className="cursor-pointer rounded-xl bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {approvalLoading === leave._id ? "Loading..." : "Reject"}
                    </button>

                  </div>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}