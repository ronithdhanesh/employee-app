const leaves = [
  {
    type: "Annual",
    start: "10 Jun 2026",
    end: "15 Jun 2026",
    status: "Approved",
  },
  {
    type: "Sick",
    start: "18 Jun 2026",
    end: "18 Jun 2026",
    status: "Approved",
  },
  {
    type: "Casual",
    start: "22 Jun 2026",
    end: "22 Jun 2026",
    status: "Pending",
  },
];

export default function LeaveHistory() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Leave History
      </h2>

      <div className="space-y-3">

        {leaves.map((leave, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border p-4"
          >
            <div>
              <p className="font-semibold">
                {leave.type}
              </p>

              <p className="text-sm text-slate-500">
                {leave.start} - {leave.end}
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