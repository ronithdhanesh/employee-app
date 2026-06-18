import {
  Mail,
  Building2,
  UserRound,
} from "lucide-react";

export default function EmployeeDirectoryCard({
  employee,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-lg font-bold">
          {employee.name[0]}
          {employee.name[0]}
        </div>

        <div>
          <h3 className="font-semibold">
            {employee.name}{" "}
          </h3>

          <p className="text-sm text-slate-500">
            {employee.position}
          </p>
        </div>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-2">
          <Building2 size={16} />
          <span className="text-sm">
            {employee?.department?.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Mail size={16} />
          <span className="text-sm">
            {employee.email}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <UserRound size={16} />
          <span className="text-sm">
            {employee.manager ||
              "Not Assigned"}
          </span>
        </div>

      </div>

    </div>
  );
}