import { useState } from "react";
import api from "../../../api/axios";

export default function EditEmployeeModal({
  employee,
  departments,
  onClose,
  onSave,
}) {
  const [form, setForm] =
    useState({
      name:
        employee?.name || "",

      email:
        employee?.email || "",

      phone:
        employee?.phone || "",

      position:
        employee?.position || "",

      role:
        employee?.role ||
        "employee",

      status:
        employee?.status ||
        "active",

      department:
        employee?.department
          ?._id || "",

      joiningDate:
        employee?.joiningDate
          ? employee.joiningDate
              .split("T")[0]
          : "",
    });

  const [isSaving, setIsSaving] = useState(false);


  function handleChange(
    e
  ) {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSaving(true);

      await onSave(form);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 shadow-xl">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Edit Employee
            </h2>

            <p className="text-slate-500">
              Update employee
              details
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl cursor-pointer hover:bg-gray-400 rounded-md hover:text-white transition-all px-1 active:bg-gray-500 active:text-white"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-8 space-y-5"
        >

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  form.name
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  form.email
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={
                  form.phone
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Position
              </label>

              <input
                type="text"
                name="position"
                value={
                  form.position
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Role
              </label>

              <select
                name="role"
                value={
                  form.role
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border p-3"
              >
                <option value="employee">
                  Employee
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                name="status"
                value={
                  form.status
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border p-3"
              >
                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Department
              </label>

              <select
                name="department"
                value={
                  form.department
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border p-3"
              >
                <option value="">
                  Select Department
                </option>

                {departments.map(
                  (
                    department
                  ) => (
                    <option
                      key={
                        department._id
                      }
                      value={
                        department._id
                      }
                    >
                      {
                        department.name
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Joining Date
              </label>

              <input
                type="date"
                name="joiningDate"
                value={
                  form.joiningDate
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 text-white"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}