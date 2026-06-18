import { useEffect, useState } from "react";
import { Mail, Phone, UserCheck } from "lucide-react";
import api from "../../api/axios"

export default function Profile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/auth/me");
        setEmployee(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const yearsAtCompany = employee
    ? Math.floor(
        (Date.now() - new Date(employee.joiningDate)) /
          (1000 * 60 * 60 * 24 * 365)
      )
    : 0;

  if (loading) {
    return (
      <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
          <p className="text-slate-600 dark:text-slate-300">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm dark:border-red-900 dark:bg-red-900/30 dark:text-red-200">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950">
      <div className="space-y-6">

        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          My Profile
        </h1>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
          <div className="flex items-center gap-6">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-900 dark:bg-slate-800 dark:text-slate-100">
              {employee?.name?.[0]}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {employee?.name} 
              </h2> 

              <p className="mt-1 text-slate-500 dark:text-slate-400">
                {employee?.position}
              </p>

              {/* Fixed: Pointing directly to the populated department string property */}
              <p className="text-slate-500 dark:text-slate-400">
                {employee?.department?.name || "No Department Assigned"}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900 dark:text-green-200">
                {employee?.status}
              </span>
            </div>

          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
            <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
              Personal Information
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                <Mail size={18} />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Email
                  </p>
                  <p>{employee?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                <Phone size={18} />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Phone
                  </p>
                  <p>{employee?.phone || "Not provided"}</p>
                </div>
              </div>

            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
            <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
              Reporting Manager
            </h3>

            {employee?.reportingManager ? (
              <div>
                <p className="text-m text-slate-800 font-semibold dark:text-slate-100">
                  {employee.reportingManager.name}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {employee.reportingManager.email}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <UserCheck size={20} className="text-slate-500 dark:text-slate-400" />
                <p className="text-slate-500 dark:text-slate-400">
                  Not Assigned Yet
                </p>
              </div>
            )}
          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
          <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
            Employment Information
          </h3>

          <div className="grid gap-6 md:grid-cols-4">

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Designation
              </p>
              <p className="text-slate-900 dark:text-slate-100">{employee?.position || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Department
              </p>
              {/* Fixed: Cleaner object target rendering */}
              <p className="text-slate-900 dark:text-slate-100">{employee?.department?.name || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Hire Date
              </p>
              {/* Optional UI enhancement: Formats ISO string into clean layout */}
              <p className="text-slate-900 dark:text-slate-100">
                {employee?.joiningDate 
                  ? new Date(employee.joiningDate).toLocaleDateString() 
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Years At Company
              </p>
              <p className="text-slate-900 dark:text-slate-100">{yearsAtCompany} Years</p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}