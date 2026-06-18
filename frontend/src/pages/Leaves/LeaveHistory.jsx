export default function LeaveHistory({ leaves }) {
  if (!leaves || leaves.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
          Leave History
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          No leave requests to show yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
      <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
        Leave History
      </h2>

      <div className="space-y-3">
        {leaves.map((leave) => (
          <div
            key={leave._id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {leave.leaveType}
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                leave.status === "Approved"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  : leave.status === "Rejected"
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200"
              }`}
            >
              {leave.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}