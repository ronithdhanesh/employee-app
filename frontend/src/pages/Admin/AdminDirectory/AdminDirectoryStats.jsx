export default function AdminDirectoryStats({
  employees,
  departments,
}) {
  const totalEmployees =
    employees.length;

  const activeEmployees =
    employees.filter(
      (employee) =>
        employee.status ===
        "active"
    ).length;

  const totalAdmins =
    employees.filter(
      (employee) =>
        employee.role === "admin"
    ).length;

  return (
    <div className="grid gap-4 md:grid-cols-4">

      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Employees
        </p>

        <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          {totalEmployees}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Departments
        </p>

        <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
          {departments.length}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Active
        </p>

        <h3 className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
          {activeEmployees}
        </h3>
      </div>

      <div className="rounded-3xl border border-slate-200 p-5 bg-white dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Admins
        </p>

        <h3 className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
          {totalAdmins}
        </h3>
      </div>

    </div>
  );
}