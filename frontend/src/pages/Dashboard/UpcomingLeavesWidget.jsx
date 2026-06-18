import dayjs from "dayjs";

export default function UpcomingLeavesWidget({
  leaves = [],
}) {
  const upcomingLeaves = leaves
    .filter(
      (leave) =>
        dayjs(
          leave.endDate
        ).isAfter(dayjs())
    )
    .sort(
      (a, b) =>
        new Date(
          a.startDate
        ) -
        new Date(
          b.startDate
        )
    )
    .slice(0, 5);

  function getStatusStyles(
    status
  ) {
    switch (
      status?.toLowerCase()
    ) {
      case "approved":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200";

      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200";

      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200";

      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
        Upcoming Leaves
      </h2>

      <div className="space-y-4">
        {upcomingLeaves.length >
        0 ? (
          upcomingLeaves.map(
            (leave) => (
              <div
                key={
                  leave._id
                }
                className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800"
              >
                <h3 className="font-medium text-slate-900 dark:text-slate-100">
                  {
                    leave.leaveType
                  }
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {dayjs(
                    leave.startDate
                  ).format(
                    "DD MMM"
                  )}{" "}
                  -{" "}
                  {dayjs(
                    leave.endDate
                  ).format(
                    "DD MMM"
                  )}
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(
                    leave.status
                  )}`}
                >
                  {
                    leave.status
                  }
                </span>
              </div>
            )
          )
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500 dark:border-slate-600 dark:text-slate-400">
            No upcoming leaves
          </div>
        )}
      </div>
    </div>
  );
}