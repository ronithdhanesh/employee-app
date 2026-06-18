import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function EmployeeManagementTable({
  employees,
  onView,
  onEdit,
  onDelete,
}) {
  if (!employees.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-slate-500">
          No employees found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="pb-4 font-semibold">
              Employee
            </th>

            <th className="pb-4 font-semibold">
              Department
            </th>

            <th className="pb-4 font-semibold">
              Position
            </th>

            <th className="pb-4 font-semibold">
              Role
            </th>

            <th className="pb-4 font-semibold">
              Status
            </th>

            <th className="pb-4 font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {employees.map(
            (employee) => (
              <tr
                key={employee._id}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-semibold">
                      {employee.name?.[0]}
                    </div>

                    <div>
                      <p className="font-medium">
                        {employee.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-4">
                  {employee.department
                    ?.name ||
                    "Not Assigned"}
                </td>

                <td className="py-4">
                  {employee.position ||
                    "-"}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      employee.role ===
                      "admin"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {employee.role}
                  </span>
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      employee.status ===
                      "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>

                <td className="py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        onView(
                          employee
                        )
                      }
                      className="cursor-pointer rounded-xl bg-slate-100 p-2 transition hover:bg-slate-200"
                    >
                      <Eye
                        size={16}
                      />
                    </button>

                    <button
                      onClick={() =>
                        onEdit(
                          employee
                        )
                      }
                      className="cursor-pointer rounded-xl bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                    >
                      <Pencil
                        size={16}
                      />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(
                          employee
                            ._id
                        )
                      }
                      className="cursor-pointer rounded-xl bg-red-600 p-2 text-white transition hover:bg-red-700"
                    >
                      <Trash2
                        size={16}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}