import {
  Users,
  Building2,
  CalendarCheck,
} from "lucide-react";

export default function AdminDashboardQuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      <div className="rounded-3xl border bg-white p-5">
        <div className="flex items-center gap-3">
          <Users />
          <h3 className="font-semibold">
            Employee Management
          </h3>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          View, edit and manage all employees.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-5">
        <div className="flex items-center gap-3">
          <Building2 />
          <h3 className="font-semibold">
            Departments
          </h3>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Organize company departments.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-5">
        <div className="flex items-center gap-3">
          <CalendarCheck />
          <h3 className="font-semibold">
            Leave Approvals
          </h3>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Review employee leave requests.
        </p>
      </div>

    </div>
  );
}