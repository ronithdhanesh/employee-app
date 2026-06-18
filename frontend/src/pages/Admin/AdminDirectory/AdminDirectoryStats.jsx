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

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Employees
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {totalEmployees}
        </h3>
      </div>

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Departments
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {departments.length}
        </h3>
      </div>

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Active
        </p>

        <h3 className="mt-2 text-3xl font-bold text-green-600">
          {activeEmployees}
        </h3>
      </div>

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Admins
        </p>

        <h3 className="mt-2 text-3xl font-bold text-blue-600">
          {totalAdmins}
        </h3>
      </div>

    </div>
  );
}