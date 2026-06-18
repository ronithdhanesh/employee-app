import api from "../../../api/axios";

export default function LeaveApprovalTable({
  leaves,
  loading,
  onRefresh,
}) {
  async function approveLeave(id) {
    try {
      await api.patch(
        `/leave/${id}/approve`
      );

      onRefresh();
    } catch (err) {
      console.log(err);
    }
  }

  async function rejectLeave(id) {
    try {
      await api.patch(
        `/leave/${id}/reject`
      );

      onRefresh();
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border bg-white p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-3 text-left">
              Employee
            </th>

            <th className="py-3 text-left">
              Leave Type
            </th>

            <th className="py-3 text-left">
              Dates
            </th>

            <th className="py-3 text-left">
              Status
            </th>

            <th className="py-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {leaves.map((leave) => (

            <tr
              key={leave._id}
              className="border-b"
            >

              <td className="py-4">
                {leave.employee?.name}
              </td>

              <td className="py-4">
                {leave.leaveType}
              </td>

              <td className="py-4">
                {new Date(
                  leave.startDate
                ).toLocaleDateString()}
                {" - "}
                {new Date(
                  leave.endDate
                ).toLocaleDateString()}
              </td>

              <td className="py-4">

                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    leave.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : leave.status ===
                        "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {leave.status}
                </span>

              </td>

              <td className="py-4">

                {leave.status ===
                  "Pending" && (
                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        approveLeave(
                          leave._id
                        )
                      }
                      className="cursor-pointer rounded-xl bg-green-600 px-3 py-2 text-white"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectLeave(
                          leave._id
                        )
                      }
                      className="cursor-pointer rounded-xl bg-red-600 px-3 py-2 text-white"
                    >
                      Reject
                    </button>

                  </div>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}