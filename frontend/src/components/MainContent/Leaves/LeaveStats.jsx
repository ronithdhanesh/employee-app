export default function LeaveStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Pending
        </p>

        <h3 className="mt-2 text-3xl font-bold text-amber-500">
          2
        </h3>
      </div>

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Approved
        </p>

        <h3 className="mt-2 text-3xl font-bold text-green-500">
          8
        </h3>
      </div>

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Rejected
        </p>

        <h3 className="mt-2 text-3xl font-bold text-red-500">
          1
        </h3>
      </div>

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Days Taken
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          14
        </h3>
      </div>

    </div>
  );
}