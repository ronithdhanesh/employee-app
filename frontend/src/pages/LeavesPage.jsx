import {
  Search,
  CheckCircle,
  XCircle,
  Clock3,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../api/axios";

export default function LeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchLeaves() {
    try {
      const res = await api.get("/leave/get");
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchLeaves();
  }, []);

  async function updateStatus(id, status) {
    try {
      await api.patch(`/leave/update/${id}`, {
        status,
      });

      fetchLeaves();
    } catch (err) {
      console.log(err);
    }
  }

  const filteredLeaves = leaves.filter((leave) => {
    const query = searchQuery.toLowerCase();

    const employeeName =
      `${leave.employeeId?.firstName || ""} ${
        leave.employeeId?.lastName || ""
      }`.toLowerCase();

    return (
      employeeName.includes(query) ||
      leave.leaveType
        ?.toLowerCase()
        .includes(query) ||
      leave.status
        ?.toLowerCase()
        .includes(query) ||
      leave.employeeId?.departmentId?.name
        ?.toLowerCase()
        .includes(query)
    );
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Pending":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Leave Requests
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Review and manage employee leave requests
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search leave requests..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Leave Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Duration
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLeaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium">
                        {leave.employeeId?.firstName}{" "}
                        {leave.employeeId?.lastName}
                      </p>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {leave.employeeId?.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {leave.employeeId?.departmentId
                      ?.name || "N/A"}
                  </td>

                  <td className="px-6 py-5">
                    {leave.leaveType}
                  </td>

                  <td className="px-6 py-5">
                    <div className="text-sm">
                      <p>
                        {new Date(
                          leave.startDate
                        ).toLocaleDateString()}
                      </p>

                      <p className="text-slate-500 dark:text-slate-400">
                        to
                      </p>

                      <p>
                        {new Date(
                          leave.endDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      {leave.status ===
                        "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(
                                leave._id,
                                "Approved"
                              )
                            }
                            className="cursor-pointer rounded-lg bg-green-600 px-3 py-2 text-white transition hover:bg-green-700"
                          >
                            <CheckCircle
                              size={16}
                            />
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                leave._id,
                                "Rejected"
                              )
                            }
                            className="cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-white transition hover:bg-red-700"
                          >
                            <XCircle
                              size={16}
                            />
                          </button>
                        </>
                      )}

                      {leave.status !==
                        "Pending" && (
                        <div className="flex items-center gap-2 text-slate-500">
                          <Clock3 size={16} />
                          Closed
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredLeaves.length ===
                0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="py-10 text-center text-slate-500"
                  >
                    No leave requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}