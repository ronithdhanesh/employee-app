import React from "react";
import { Pencil, Trash2 } from "lucide-react";

function EmployeeRow({
  employee,
  onView,
  onEdit,
  onDelete,
  getStatusBadge,
}) {
  return (
    <tr className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold dark:bg-slate-700">
            {employee.firstName?.charAt(0)}
          </div>

          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              {employee.firstName} {employee.lastName}
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {employee.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-slate-700 dark:text-slate-300">
        {employee.designation}
      </td>

      <td className="px-6 py-5 text-slate-700 dark:text-slate-300">
        {employee.departmentId?.name || "N/A"}
      </td>

      <td className="px-6 py-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
            employee.status
          )}`}
        >
          {employee.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-end gap-2">
          <button
            className="cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            onClick={() => onView(employee)}
          >
            View Details
          </button>

          <button
            className="cursor-pointer rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            onClick={() => onEdit(employee)}
          >
            <Pencil size={18} />
          </button>

          <button
            className="cursor-pointer rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
            onClick={() => onDelete(employee._id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default React.memo(EmployeeRow);