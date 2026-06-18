import { useState } from "react";

export default function EditEmployeeModal({
  employee,
  departments,
  employees = [], // Added employees array prop
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    name: employee?.name || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    position: employee?.position || "",
    role: employee?.role || "employee",
    status: employee?.status || "active",
    department: employee?.department?._id || employee?.department || "",
    reportingManager: employee?.reportingManager?._id || employee?.reportingManager || "", // Added reportingManager field
    joiningDate: employee?.joiningDate
      ? employee.joiningDate.split("T")[0]
      : "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Filter out the current employee from being selected as their own manager
  const potentialManagers = employees.filter(
    (emp) => emp._id !== employee?._id
  );

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSaving(true);
      // Clean empty values to null before saving if needed
      const payload = {
        ...form,
        reportingManager: form.reportingManager || null,
        department: form.department || null,
      };
      await onSave(payload);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900 dark:shadow-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Edit Employee
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Update employee details
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl cursor-pointer hover:bg-gray-400 dark:hover:bg-slate-700 rounded-md hover:text-white transition-all px-1 active:bg-gray-500 active:text-white"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                Department
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            {/* NEW: Reporting Manager Fields Selector Section */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                Reporting Manager
              </label>
              <select
                name="reportingManager"
                value={form.reportingManager}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="">None / No Manager Assigned</option>
                {potentialManagers.map((mgr) => (
                  <option key={mgr._id} value={mgr._id}>
                    {mgr.name} ({mgr.position || "No position"})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                Joining Date
              </label>
              <input
                type="date"
                name="joiningDate"
                value={form.joiningDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-slate-300 px-5 py-3 text-slate-900 hover:bg-slate-100 transition dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="cursor-pointer rounded-xl bg-slate-900 px-5 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}