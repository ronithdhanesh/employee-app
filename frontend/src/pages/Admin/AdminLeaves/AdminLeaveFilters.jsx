import { Search } from "lucide-react";

export default function AdminLeaveFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="space-y-4">

      <div className="relative max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-3.5 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search employee..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none"
        />
      </div>

      <div className="flex gap-2">

        {[
          "All",
          "Pending",
          "Approved",
          "Rejected",
        ].map((status) => (
          <button
            key={status}
            onClick={() =>
              setStatusFilter(status)
            }
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              statusFilter === status
                ? "bg-slate-900 text-white"
                : "bg-slate-100"
            }`}
          >
            {status}
          </button>
        ))}

      </div>

    </div>
  );
}