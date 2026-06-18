export default function LeaveStats({ leaves }) {
  const pending = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;
  const approved = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;
  const rejected = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  const daysTaken = leaves.reduce(
    (sum, leave) => {
      if (leave.status !== "Approved") return sum;
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      const diff = Math.ceil(
        (end - start) / (1000 * 60 * 60 * 24) + 1
      );
      return sum + diff;
    },
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
        <h3 className="mt-2 text-3xl font-bold text-amber-500 dark:text-amber-400">
          {pending}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Approved</p>
        <h3 className="mt-2 text-3xl font-bold text-green-500 dark:text-green-400">
          {approved}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Rejected</p>
        <h3 className="mt-2 text-3xl font-bold text-red-500 dark:text-red-400">
          {rejected}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Days Taken</p>
        <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{daysTaken}</h3>
      </div>
    </div>
  );
}