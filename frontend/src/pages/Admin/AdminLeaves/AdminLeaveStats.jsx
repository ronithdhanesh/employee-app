export default function AdminLeaveStats({
  leaves,
}) {
  const pending = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const approved = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const rejected = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-3">

      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Pending
        </p>

        <h3 className="mt-2 text-3xl font-bold text-amber-500 dark:text-amber-400">
          {pending}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Approved
        </p>

        <h3 className="mt-2 text-3xl font-bold text-green-500 dark:text-green-400">
          {approved}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Rejected
        </p>

        <h3 className="mt-2 text-3xl font-bold text-red-500 dark:text-red-400">
          {rejected}
        </h3>
      </div>

    </div>
  );
}