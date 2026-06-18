export default function AdminDashboardStats({
  employees,
  departments,
  leaves,
}) {
  const pendingLeaves =
    leaves.filter(
      (leave) =>
        leave.status === "Pending"
    ).length;

  return (
    <div className="grid gap-4 md:grid-cols-4">

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Employees
        </p>

        <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          {employees.length}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Departments
        </p>

        <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          {departments.length}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Leave Requests
        </p>

        <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          {leaves.length}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Pending Approvals
        </p>

        <h3 className="mt-2 text-3xl font-bold text-amber-500 dark:text-amber-400">
          {pendingLeaves}
        </h3>
      </div>

    </div>
  );
}