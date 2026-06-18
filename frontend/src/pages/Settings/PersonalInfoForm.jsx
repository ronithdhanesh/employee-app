import { useEffect, useState } from "react";
import api from "../../api/axios"

export default function PersonalInfoForm({ employee, onProfileUpdated }) {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phone: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || "",
        address: employee.address || "",
        phone: employee.phone || "",
      });
    }
  }, [employee]);

  async function handleSubmit(e) {
    e.preventDefault();
    
    setError("");
    setMessage("");

    try {
      setIsSaving(true);
      await api.patch("/employee/profile", form);
      setMessage("Profile updated successfully.");
      if (onProfileUpdated) {
        await onProfileUpdated();
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
      <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
        Personal Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                fullName: e.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Address
          </label>
          <input
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone
          </label>
          <input
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {message && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-slate-900 px-6 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}