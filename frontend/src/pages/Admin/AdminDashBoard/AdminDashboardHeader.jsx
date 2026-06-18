import { ShieldCheck } from "lucide-react";

export default function AdminDashboardHeader() {
  return (
    <div className="flex items-center gap-4">

      <div className="rounded-3xl bg-slate-900 p-4 text-white dark:bg-blue-600">
        <ShieldCheck size={28} />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 dark:text-slate-400">
          Manage employees, departments and approvals.
        </p>
      </div>

    </div>
  );
}