export default function EmployeeProfileModal({
  employee,
  onClose,
}) {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl">

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Employee Profile
            </h2>

            <p className="text-slate-500">
              Detailed employee information
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl cursor-pointer hover:bg-gray-400 rounded-md hover:text-white transition-all px-1 active:bg-gray-500 active:text-white"
          >
            ×
          </button>

        </div>

        <div className="mt-8 flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold">
            {employee.name?.[0]}
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              {employee.name}
            </h3>

            <p className="text-slate-500">
              {employee.position || "No Position"}
            </p>
          </div>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">

          <Info
            label="Email"
            value={employee.email}
          />

          <Info
            label="Phone"
            value={
              employee.phone ||
              "Not Provided"
            }
          />

          <Info
            label="Role"
            value={employee.role}
          />

          <Info
            label="Status"
            value={employee.status}
          />

          <Info
            label="Department"
            value={
              employee.department?.name ||
              "Not Assigned"
            }
          />

          <Info
            label="Position"
            value={
              employee.position ||
              "Not Assigned"
            }
          />

          <Info
            label="Joining Date"
            value={
              employee.joiningDate
                ? new Date(
                    employee.joiningDate
                  ).toLocaleDateString()
                : "-"
            }
          />

        </div>

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border p-4">

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>

    </div>
  );
}