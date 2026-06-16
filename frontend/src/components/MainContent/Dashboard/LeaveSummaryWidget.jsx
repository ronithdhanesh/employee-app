export default function LeaveSummaryWidget() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-semibold">
        Leave Summary
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-sm text-slate-500">
            Approved
          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-600">
            12
          </h3>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <h3 className="mt-2 text-2xl font-bold text-amber-600">
            3
          </h3>
        </div>

        <div className="rounded-2xl bg-red-50 p-4">
          <p className="text-sm text-slate-500">
            Rejected
          </p>

          <h3 className="mt-2 text-2xl font-bold text-red-600">
            1
          </h3>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm text-slate-500">
            Remaining
          </p>

          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            15
          </h3>
        </div>
      </div>
    </div>
  );
}