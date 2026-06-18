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
          className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500"
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
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
        />

      </div>

      <div className="flex flex-wrap gap-2">

        <button
          onClick={() =>
            setSelectedDepartment(
              "All"
            )
          }
          className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedDepartment ===
            "All"
              ? "bg-slate-900 text-white dark:bg-blue-600"
              : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-200 transition"
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
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedDepartment ===
                department._id
                  ? "bg-slate-900 text-white dark:bg-blue-600"
                  : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-200 transition"
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