import { Search } from "lucide-react";

export default function AdminDirectoryFilters({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  departments,
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
            setSearchQuery(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none"
        />

      </div>

      <div className="flex flex-wrap gap-2">

        <button
          onClick={() =>
            setSelectedDepartment(
              "All"
            )
          }
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            selectedDepartment ===
            "All"
              ? "bg-slate-900 text-white"
              : "bg-slate-100"
          }`}
        >
          All
        </button>

        {departments.map(
          (department) => (
            <button
              key={
                department._id
              }
              onClick={() =>
                setSelectedDepartment(
                  department._id
                )
              }
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                selectedDepartment ===
                department._id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100"
              }`}
            >
              {department.name}
            </button>
          )
        )}

      </div>

    </div>
  );
}