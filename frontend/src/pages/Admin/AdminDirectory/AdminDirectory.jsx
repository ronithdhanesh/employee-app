import { useEffect, useState, useMemo, useCallback } from "react";
import api from "../../../api/axios";

import AdminDirectoryStats from "./AdminDirectoryStats";
import AdminDirectoryFilters from "./AdminDirectoryFilters";
import EmployeeManagementTable from "./EmployeeManagementTable";
import EmployeeProfileModal from "./EmployeeProfileModal"; 
import EditEmployeeModal from "./EditEmployeeModal";

export default function AdminDirectory() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = useCallback(async() => {
    try {
      const res = await api.get("/auth/users");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  },[])

  const handleDelete = useCallback(async(id) => {
    const confirmed =
      window.confirm(
        "Delete this employee?"
      );

    if (!confirmed) return;

    try {
      await api.delete(
        `/auth/users/${id}`
      );

      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  }, [])

  async function fetchDepartments() {
    try {
      const res = await api.get("/dept/get");
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSaveEmployee(
    employeeId,
    data
  ) {
    try {
      await api.patch(
        `/auth/users/${employeeId}`,
        data
      );

      await fetchEmployees();

      setEditingEmployee(null);
    } catch (err) {
      console.log(err);
    }
  }

  const filteredEmployees = useMemo(() => {
      return employees.filter((employee) => {
        const matchesSearch =
          employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.position?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDepartment =
          selectedDepartment === "All" ||
          employee.department?._id === selectedDepartment;

        return matchesSearch && matchesDepartment;
      });
    }, [employees, searchQuery, selectedDepartment]);

  return (
    <main className="flex-1 p-8 bg-slate-50 dark:bg-slate-950">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Employee Management</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage all employees in the organization.
          </p>
        </div>

        <AdminDirectoryStats
          employees={employees}
          departments={departments}
        />

        <AdminDirectoryFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          departments={departments}
        />

        <EmployeeManagementTable
          employees={filteredEmployees}
          onView={(employee) =>
            setSelectedEmployee(employee)
          }
          onEdit={(employee) =>
            setEditingEmployee(employee)
          }
          onDelete={handleDelete}
        />
      </div>

      {selectedEmployee && (
        <EmployeeProfileModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          departments={departments}
          employees={employees}
          onClose={() => setEditingEmployee(null)}
          onSave={(data) =>
            handleSaveEmployee(
              editingEmployee._id,
              data
            )
          }
        />
      )}
    </main>
  );
}