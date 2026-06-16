import EmployeeDirectoryCard from "./EmployeeDirectoryCard";

export default function DirectoryGrid({
  employees,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {employees.map((employee) => (
        <EmployeeDirectoryCard
          key={employee._id}
          employee={employee}
        />
      ))}
    </div>
  );
}