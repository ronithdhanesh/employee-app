export default function AdminLeaveStats({
  leaves,
}) {
  const pending = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const approved = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const rejected = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-3">

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Pending
        </p>

        <h3 className="mt-2 text-3xl font-bold text-amber-500">
          {pending}
        </h3>
      </div>

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Approved
        </p>

        <h3 className="mt-2 text-3xl font-bold text-green-500">
          {approved}
        </h3>
      </div>

      <div className="rounded-3xl border p-5 bg-white">
        <p className="text-sm text-slate-500">
          Rejected
        </p>

        <h3 className="mt-2 text-3xl font-bold text-red-500">
          {rejected}
        </h3>
      </div>

    </div>
  );
}