export default function ProfileSection({
  employee,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-5">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold">
          {employee?.name?.[0]}
          {/* {employee?.lastName?.[0]} */}
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            {employee?.name}{" "}
            {/* {employee?.lastName} */}
          </h2>

          <p className="text-slate-500">
            {employee?.position}
          </p>

          <p className="text-slate-500">
            {employee?.department?.name}
          </p>
        </div>

      </div>
    </div>
  );
}