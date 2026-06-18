import { useState } from "react";
import api from "../../api/axios"

export default function LeaveRequestForm({
  // onLeaveApplied,
}) {
  const [form, setForm] = useState({
    leaveType: "Sick",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.startDate ||
      !form.endDate
    ) {
      setError(
        "Please select both start and end dates."
      );
      return;
    }

    if (
      new Date(form.startDate) >
      new Date(form.endDate)
    ) {
      setError(
        "Start date cannot be after end date."
      );
      return;
    }

    if (!form.reason.trim()) {
      setError(
        "Please provide a reason."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await api.post(
        "/leave/apply",
        {
          leaveType: form.leaveType,
          startDate: form.startDate,
          endDate: form.endDate,
          reason: form.reason,
        }
      );

      setForm({
        leaveType: "Sick",
        startDate: "",
        endDate: "",
        reason: "",
      });

      setSuccess(
        "Leave request submitted successfully."
      );

      // if (onLeaveApplied) {
      //   await onLeaveApplied();
      // }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to submit leave request."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
      <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
        Apply Leave
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Leave Type
          </label>

          <select
            value={form.leaveType}
            onChange={(e) =>
              setForm({
                ...form,
                leaveType:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="Sick">
              Sick
            </option>

            <option value="Annual">
              Annual
            </option>

            <option value="Personal">
              Personal
            </option>

            <option value="Emergency">
              Emergency
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Start Date
          </label>

          <input
            type="date"
            min={today}
            value={form.startDate}
            onChange={(e) =>
              setForm({
                ...form,
                startDate:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            End Date
          </label>

          <input
            type="date"
            min={
              form.startDate ||
              today
            }
            value={form.endDate}
            onChange={(e) =>
              setForm({
                ...form,
                endDate:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Reason
          </label>

          <textarea
            rows="4"
            value={form.reason}
            onChange={(e) =>
              setForm({
                ...form,
                reason:
                  e.target.value,
              })
            }
            placeholder="Reason for leave..."
            className="w-full rounded-xl border border-slate-300 p-3 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {success && (
          <p className="text-sm text-green-600 dark:text-green-400">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer w-full rounded-xl bg-slate-900 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {isSubmitting
            ? "Submitting..."
            : "Submit Request"}
        </button>
      </form>
    </div>
  );
}