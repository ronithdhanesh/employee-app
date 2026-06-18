export default function AdminPendingLeaves({
  leaves,
}) {
  const pendingLeaves =
    leaves.filter(
      (leave) =>
        leave.status === "Pending"
    );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">

      <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-slate-100">
        Pending Leave Requests
      </h2>

      <div className="space-y-3">

        {pendingLeaves
          .slice(0, 5)
          .map((leave) => (
            <div
              key={leave._id}
              className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {
                  leave.employee
                    ?.name
                }
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {
                  leave.leaveType
                }
              </p>
            </div>
          ))}

      </div>

    </div>
  );
}