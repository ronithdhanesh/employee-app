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

      <div className="rounded-3xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Employees
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {employees.length}
        </h3>
      </div>

      <div className="rounded-3xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Departments
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {departments.length}
        </h3>
      </div>

      <div className="rounded-3xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Leave Requests
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {leaves.length}
        </h3>
      </div>

      <div className="rounded-3xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Pending Approvals
        </p>

        <h3 className="mt-2 text-3xl font-bold text-amber-500">
          {pendingLeaves}
        </h3>
      </div>

    </div>
  );
}