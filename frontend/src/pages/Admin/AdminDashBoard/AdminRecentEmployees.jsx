export default function AdminRecentEmployees({
  employees,
}) {
  const recentEmployees =
    [...employees]
      .sort(
        (a, b) =>
          new Date(
            b.createdAt
          ) -
          new Date(
            a.createdAt
          )
      )
      .slice(0, 5);

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Recently Added Employees
      </h2>

      <div className="space-y-3">

        {recentEmployees.map(
          (employee) => (
            <div
              key={
                employee._id
              }
              className="flex items-center gap-3 rounded-2xl border p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold">
                {
                  employee.name?.[0]
                }
              </div>

              <div>
                <p className="font-medium">
                  {
                    employee.name
                  }
                </p>

                <p className="text-sm text-slate-500">
                  {
                    employee.position
                  }
                </p>
              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
}