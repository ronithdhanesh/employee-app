import LeaveStats from "./LeaveStats";
import LeaveRequestForm from "./LeaveRequestForm";
import LeaveHistory from "./LeaveHistory";

export default function Leaves() {
  return (
    <main className="flex-1 p-8">
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Leaves
          </h1>

          <p className="mt-2 text-slate-500">
            Apply for leave and track your requests
          </p>
        </div>

        <LeaveStats />

        <div className="grid gap-6 xl:grid-cols-3">

          <div className="xl:col-span-1">
            <LeaveRequestForm />
          </div>

          <div className="xl:col-span-2">
            <LeaveHistory />
          </div>

        </div>

      </div>
    </main>
  );
}