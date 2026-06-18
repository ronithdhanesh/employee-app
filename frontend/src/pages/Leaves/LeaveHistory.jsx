export default function LeaveHistory({ leaves }) {
  if (!leaves || leaves.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          Leave History
        </h2>
        <p className="text-slate-500">
          No leave requests to show yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Leave History
      </h2>

      <div className="space-y-3">
        {leaves.map((leave) => (
          <div
            key={leave._id}
            className="flex items-center justify-between rounded-2xl border p-4"
          >
            <div>
              <p className="font-semibold">
                {leave.leaveType}
              </p>

              <p className="text-sm text-slate-500">
                {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm ${
                leave.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : leave.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-700"
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