import { ShieldCheck } from "lucide-react";

export default function AdminDashboardHeader() {
  return (
    <div className="flex items-center gap-4">

      <div className="rounded-3xl bg-slate-900 p-4 text-white">
        <ShieldCheck size={28} />
      </div>

      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-slate-500">
          Manage employees, departments and approvals.
        </p>
      </div>

    </div>
  );
}