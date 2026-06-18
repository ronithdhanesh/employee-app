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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">

      <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-slate-100">
        Recently Added Employees
      </h2>

      <div className="space-y-3">

        {recentEmployees.map(
          (employee) => (
            <div
              key={
                employee._id
              }
              className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-900 dark:bg-slate-700 dark:text-slate-100">
                {
                  employee.name?.[0]
                }
              </div>

              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {
                    employee.name
                  }
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
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