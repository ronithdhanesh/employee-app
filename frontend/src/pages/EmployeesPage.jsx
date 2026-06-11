import {
  Plus,
  Search,
  Pencil,
  Trash2,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";
import CreateEmployee from "../components/CreateEmployee";
import UpdateEmployee from "../components/UpdateEmployee";
import EmployeeCard from "../components/EmployeeCard";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import api from "../api/axios";

export default function EmployeesPage() {
  const [showCreateJSX, setShowCreateJSX] = useState(false);
  const [showUpdateJSX, setShowUpdateJSX] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const fetchEmployees = async () => {
    try {
      const result = await api.get("/employee/get");
      setEmployees(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/employee/delete/${id}`);
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredEmployees = employees.filter(
    (employee) => {
      const query = searchQuery.toLowerCase();

      const fullName =
        `${employee.firstName || ""} ${
          employee.lastName || ""
        }`.toLowerCase();

      return (
        fullName.includes(query) ||
        employee.email
          ?.toLowerCase()
          .includes(query) ||
        employee.designation
          ?.toLowerCase()
          .includes(query) ||
        employee.departmentId?.name
          ?.toLowerCase()
          .includes(query)
      );
    }
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "On Leave":
        return "bg-amber-100 text-amber-700";

      case "Terminated":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            
            <h1 className="text-4xl font-bold">
              Employees
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Manage your organization's workforce
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() =>
                setShowCreateJSX(true)
              }
            >
              <Plus size={18} />
              Add Employee
            </button>

            <button
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-red-950"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
            {/* <button
              onClick={toggleTheme}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium transition dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button> */}
          </div>
        </div>

        {/* Create Modal */}
        {showCreateJSX && (
          <CreateEmployee
            onClose={() =>
              setShowCreateJSX(false)
            }
            refreshEmployees={
              fetchEmployees
            }
          />
        )}

        {/* Update Modal */}
        {showUpdateJSX && (
          <UpdateEmployee
            employee={selectedEmployee}
            onClose={() =>
              setShowUpdateJSX(false)
            }
            refreshEmployees={
              fetchEmployees
            }
          />
        )}

        {showEmployeeDetails && (
          <EmployeeCard 
            employee={selectedEmployee}
            onClose={()=>{setShowEmployeeDetails(false)}}
          />
        )}

        {/* Search */}
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-3.5 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Designation
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map(
                (employee) => (
                  <tr
                    key={employee._id}
                    className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold dark:bg-slate-700">
                          {employee.firstName?.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {
                              employee.firstName
                            }{" "}
                            {
                              employee.lastName
                            }
                          </p>

                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {employee.email}
                          </p>
                          {/* <img
                            src={`http://localhost:3000${employee.profileImage}`}
                            alt={employee.firstName}
                            width={50}
                            height={50}
                          /> */}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-700 dark:text-slate-300">
                      {
                        employee.designation
                      }
                    </td>

                    <td className="px-6 py-5 text-slate-700 dark:text-slate-300">
                      {employee
                        .departmentId?.name ||
                        "N/A"}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                          employee.status
                        )}`}
                      >
                        {employee.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          className="cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                          onClick={() => {
                            setShowEmployeeDetails(true)
                            setSelectedEmployee(employee);
                            // console.log(employee);
                          }}
                        >
                          View Details
                        </button>

                        <button
                          className="cursor-pointer rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setShowUpdateJSX(true);
                          }}
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          className="cursor-pointer rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                          onClick={() => handleDelete(employee._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}

              {filteredEmployees.length ===
                0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-10 text-center text-slate-500"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}