import {
  Users,
  Building2,
  CalendarCheck,
} from "lucide-react";

export default function AdminDashboardQuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Users className="text-slate-900 dark:text-slate-100" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Employee Management
          </h3>
        </div>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          View, edit and manage all employees.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Building2 className="text-slate-900 dark:text-slate-100" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Departments
          </h3>
        </div>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Organize company departments.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <CalendarCheck className="text-slate-900 dark:text-slate-100" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Leave Approvals
          </h3>
        </div>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Review employee leave requests.
        </p>
      </div>

    </div>
  );
}