import {
  Mail,
  Phone,
  Briefcase,
  Building2,
  Calendar,
  Clock,
} from "lucide-react";
import React from "react";

function EmployeeCard({
  employee,
  onClose,
}) {
  if (!employee) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "On Leave":
        return "bg-amber-100 text-amber-700";

      case "Terminated":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="relative h-40 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
          <button
            onClick={onClose}
            className="cursor-pointer absolute right-5 top-5 rounded-lg bg-white/10 px-3 py-2 text-white hover:bg-white/20"
          >
            ✕
          </button>
        </div>

        <div className="relative px-8 pb-8">
          <div className="-mt-16 flex flex-col items-center md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col items-center md:flex-row md:items-end md:gap-6">

              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg">
                {employee.profileImage ? (
                  <img
                    src={`http://localhost:3000${employee.profileImage}`}
                    alt={employee.firstName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-slate-600">
                    {employee.firstName?.charAt(0)}
                  </div>
                )}
              </div>

              <div className="mt-4 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white">
                  {employee.firstName} {employee.lastName}
                </h2>

                <p className="mt-1 text-lg text-slate-600">
                  {employee.designation}
                </p>

                <span
                  className={`mt-3 inline-flex rounded-full px-4 py-1 text-sm font-semibold ${getStatusBadge(
                    employee.status
                  )}`}
                >
                  {employee.status}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail
                    size={18}
                    className="text-slate-500"
                  />
                  <div>
                    <p className="text-xs text-slate-500">
                      Email
                    </p>
                    <p className="font-medium">
                      {employee.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone
                    size={18}
                    className="text-slate-500"
                  />
                  <div>
                    <p className="text-xs text-slate-500">
                      Phone
                    </p>
                    <p className="font-medium">
                      {employee.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">
                Employment Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Briefcase
                    size={18}
                    className="text-slate-500"
                  />
                  <div>
                    <p className="text-xs text-slate-500">
                      Designation
                    </p>
                    <p className="font-medium">
                      {employee.designation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Building2
                    size={18}
                    className="text-slate-500"
                  />
                  <div>
                    <p className="text-xs text-slate-500">
                      Department
                    </p>
                    <p className="font-medium">
                      {employee.departmentId
                        ?.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar
                    size={18}
                    className="text-slate-500"
                  />
                  <div>
                    <p className="text-xs text-slate-500">
                      Hire Date
                    </p>
                    <p className="font-medium">
                      {new Date(
                        employee.hireDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 md:col-span-2">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">
                System Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Clock
                    size={18}
                    className="text-slate-500"
                  />
                  <div>
                    <p className="text-xs text-slate-500">
                      Created At
                    </p>
                    <p className="font-medium">
                      {new Date(
                        employee.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock
                    size={18}
                    className="text-slate-500"
                  />
                  <div>
                    <p className="text-xs text-slate-500">
                      Last Updated
                    </p>
                    <p className="font-medium">
                      {new Date(
                        employee.updatedAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(EmployeeCard)