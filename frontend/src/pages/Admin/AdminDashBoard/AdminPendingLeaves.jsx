export default function AdminPendingLeaves({
  leaves,
}) {
  const pendingLeaves =
    leaves.filter(
      (leave) =>
        leave.status === "Pending"
    );

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Pending Leave Requests
      </h2>

      <div className="space-y-3">

        {pendingLeaves
          .slice(0, 5)
          .map((leave) => (
            <div
              key={leave._id}
              className="rounded-2xl border p-4"
            >
              <p className="font-medium">
                {
                  leave.employee
                    ?.name
                }
              </p>

              <p className="text-sm text-slate-500">
                {
                  leave.leaveType
                }
              </p>
            </div>
          ))}

      </div>

    </div>
  );
}