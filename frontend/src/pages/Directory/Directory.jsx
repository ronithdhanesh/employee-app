import { useEffect, useState } from "react";

import api from "../../api/axios"

import DirectoryHeader from "./DirectoryHeader";
import DirectoryFilters from "./DirectoryFilters";
import DirectoryGrid from "./DirectoryGrid";

export default function Directory() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedDepartment,setSelectedDepartment] = useState("All");

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  async function fetchEmployees() {
    try {
      const res = await api.get(
        "/auth/users"
      );

      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchDepartments() {
    try {
      const res = await api.get("/dept/get");

      setDepartments(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const filteredEmployees =
    employees.filter((employee) => {

      const fullName = `${employee.name}`.toLowerCase();

      const matchesSearch =
        fullName.includes(
          searchQuery.toLowerCase()
        ) ||
        employee.email
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        employee.position
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "All" ||
        employee.department?._id === selectedDepartment;

        
      return (
        matchesSearch &&
        matchesDepartment
      );
    });

  return (
    <main className="flex-1 p-8">
      <div className="space-y-6">

        <DirectoryHeader />

        <DirectoryFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDepartment={
            selectedDepartment
          }
          setSelectedDepartment={
            setSelectedDepartment
          }
          departments={departments}
        />

        <DirectoryGrid
          employees={filteredEmployees}
        />

      </div>
    </main>
  );
}