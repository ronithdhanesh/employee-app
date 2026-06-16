const upcomingLeaves = [
  {
    type: "Annual Leave",
    start: "20 Jun",
    end: "25 Jun",
    status: "Approved",
  },
  {
    type: "Sick Leave",
    start: "03 Jul",
    end: "05 Jul",
    status: "Pending",
  },
];

export default function UpcomingLeavesWidget() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-semibold">
        Upcoming Leaves
      </h2>

      <div className="space-y-4">
        {upcomingLeaves.map((leave, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
          >
            <h3 className="font-medium">
              {leave.type}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {leave.start} - {leave.end}
            </p>

            <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              {leave.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}