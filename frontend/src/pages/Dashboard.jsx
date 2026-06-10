import {
  Plus,
  Search,
  Pencil,
  Trash2,
  LogOut, 
} from "lucide-react";

import { React, useEffect, useState } from "react";
import CreateEmployee from "../components/CreateEmployee";
import UpdateEmployee from "../components/UpdateEmployee";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EmployeesPage() {
  const [showCreateJSX, setShowCreateJSX] = useState(false);
  const [showUpdateJSX, setShowUpdateJSX] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const result = await api.get("/employee/get");
    setEmployees(result.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function handleDelete(id) {
    await api.delete(`/employee/delete/${id}`);
    fetchEmployees(); 
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredEmployees = employees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      (employee.name && employee.name.toLowerCase().includes(query)) ||
      (employee.role && employee.role.toLowerCase().includes(query)) ||
      (employee.department && employee.department.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Employees
            </h1>
            <p className="mt-2 text-slate-500">
              Manage your organization's workforce
            </p>
          </div>

          {/* Action Buttons Container */}
          <div className="flex items-center gap-3">
            <button
              className="cursor-pointer flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
              onClick={() => setShowCreateJSX(true)}
            >
              <Plus size={18} />
              Add Employee
            </button>

            <button
              className="cursor-pointer flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {showCreateJSX && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <CreateEmployee onClose={() => setShowCreateJSX(false)} refreshEmployees={fetchEmployees} />
          </div>
        )}


        {showUpdateJSX && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <UpdateEmployee onClose={() => setShowUpdateJSX(false)} employee={selectedEmployee} refreshEmployees={fetchEmployees} />
          </div>
        )}

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
              onChange={(e)=>{setSearchQuery(e.target.value)}}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-slate-900"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Department
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id || employee._id} 
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold mb-0">
                        {employee.name ? employee.name.charAt(0) : "E"}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {employee.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {employee.id ? `EMP-${employee.id.toString().padStart(3, "0")}` : "EMP-000"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-700">
                    {employee.role}
                  </td>

                  <td className="px-6 py-5 text-slate-700">
                    {employee.department}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="cursor-pointer rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                        onClick={() => {
                          setShowUpdateJSX(true);
                          setSelectedEmployee(employee);
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
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}