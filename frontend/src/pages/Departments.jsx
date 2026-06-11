import {
  Building2,
  Plus,
  Search,
  Pencil,
  Trash2,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CreateDepartment from "../components/CreateDepartment";
import UpdateDepartment from "../components/UpdateDepartment";



export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [showCreateDepartment, setShowCreateDepartment] =
    useState(false);

  const [showUpdateDepartment, setShowUpdateDepartment] =
    useState(false);

  const [selectedDepartment, setSelectedDepartment] =
    useState(null);

  const navigate = useNavigate();

    async function fetchDepartments() {
        try {
        const result = await api.get("/dept/get");
        setDepartments(result.data);
        } catch (err) {
        console.log(err);
        }
    }

  useEffect(() => {
    fetchDepartments();
  }, []);



  async function handleDelete(id) {
    try {
      await api.delete(`/dept/delete/${id}`);
      fetchDepartments();
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredDepartments =
    departments.filter((department) =>
      department.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              Departments
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Manage organizational departments and
              teams
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setShowCreateDepartment(true)
              }
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              <Plus size={18} />
              Add Department
            </button>

            <button
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-red-950"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>


        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Department Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDepartments.map((department) => (
            <div
              key={department._id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700">
                <Building2
                  size={28}
                  className="text-slate-700 dark:text-slate-200"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {department.name}
              </h3>

              

              {/* Stats */}
              <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Department Status
                </p>

                <p className="mt-1 font-medium text-green-600 dark:text-emerald-400">
                  Active
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedDepartment(
                      department
                    );
                    setShowUpdateDepartment(true);
                  }}
                  className="cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(department._id)
                  }
                  className="cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 font-medium text-red-600 transition hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDepartments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <Building2
              size={60}
              className="mx-auto mb-4 text-slate-300 dark:text-slate-600"
            />

            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              No Departments Found
            </h3>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Create your first department to get
              started.
            </p>
          </div>
        )}

        {/* Create Department Modal */}
        {showCreateDepartment && (
          <CreateDepartment
            onClose={() =>
              setShowCreateDepartment(false)
            }
            refreshDepartments={fetchDepartments}
          />
        )}

        {/* Update Department Modal */}
        {showUpdateDepartment && (
          <UpdateDepartment
            department={selectedDepartment}
            onClose={() =>
              setShowUpdateDepartment(false)
            }
            refreshDepartments={fetchDepartments}
          />
        )}
      </div>
    </div>
  );
}