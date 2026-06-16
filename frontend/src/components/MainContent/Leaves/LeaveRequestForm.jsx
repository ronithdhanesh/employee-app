import { useState } from "react";

export default function LeaveRequestForm() {

  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Apply Leave
      </h2>

      <div className="space-y-4">

        <select
          className="w-full rounded-xl border p-3"
        >
          <option>Sick</option>
          <option>Annual</option>
          <option>Casual</option>
          <option>Maternity</option>
          <option>Paternity</option>
          <option>Unpaid</option>
        </select>

        <input
          type="date"
          className="w-full rounded-xl border p-3"
        />

        <input
          type="date"
          className="w-full rounded-xl border p-3"
        />

        <textarea
          rows="4"
          placeholder="Reason"
          className="w-full rounded-xl border p-3"
        />

        <button
          className="w-full rounded-xl bg-slate-900 py-3 text-white"
        >
          Submit Request
        </button>

      </div>

    </div>
  );
}