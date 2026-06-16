import {
  Mail,
  Phone,
  Building2,
  UserCheck,
  CalendarDays,
} from "lucide-react";

export default function Profile() {

  const employee = {
    firstName: "John",
    lastName: "Doe",
    email: "john@company.com",
    phone: "+91 9876543210",
    designation: "Software Engineer",
    department: "Engineering",
    hireDate: "2024-01-12",
    status: "Active",
    reportingManager: null,
  };

  const yearsAtCompany = Math.floor(
    (Date.now() -
      new Date(employee.hireDate)) /
      (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <main className="flex-1 p-8">
      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-6">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold">
              {employee.firstName[0]}
              {employee.lastName[0]}
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {employee.firstName}{" "}
                {employee.lastName}
              </h2>

              <p className="mt-1 text-slate-500">
                {employee.designation}
              </p>

              <p className="text-slate-500">
                {employee.department}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {employee.status}
              </span>
            </div>

          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold">
              Personal Information
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <div>
                  <p className="text-sm text-slate-500">
                    Email
                  </p>
                  <p>{employee.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <div>
                  <p className="text-sm text-slate-500">
                    Phone
                  </p>
                  <p>{employee.phone}</p>
                </div>
              </div>

            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold">
              Reporting Manager
            </h3>

            {employee.reportingManager ? (
              <div>
                Manager Details
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <UserCheck size={20} />
                <p className="text-slate-500">
                  Not Assigned Yet
                </p>
              </div>
            )}
          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-xl font-semibold">
            Employment Information
          </h3>

          <div className="grid gap-6 md:grid-cols-4">

            <div>
              <p className="text-sm text-slate-500">
                Designation
              </p>
              <p>{employee.designation}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Department
              </p>
              <p>{employee.department}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Hire Date
              </p>
              <p>{employee.hireDate}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Years At Company
              </p>
              <p>{yearsAtCompany} Years</p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}