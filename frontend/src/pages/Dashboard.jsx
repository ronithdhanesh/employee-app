import React, { useState, useEffect } from "react";
import {
  Users,
  Building2,
  CalendarCheck,
  FileText,
  TrendingUp,
  UserPlus,
  Clock3,
  ArrowUpRight,
  LogOut
} from "lucide-react";



import { useNavigate } from "react-router-dom";
import CreateEmployee from "../components/CreateEmployee";
import CreateDepartment from "../components/CreateDepartment";
import api from "../api/axios"



export default function Dashboard() {
    const [showCreateEmployee, setShowCreateEmployee] = useState(false)
    const [showCreateDepartment, setShowCreateDepartment] = useState(false)
    const [employees, setEmployees] = useState([])
    const [departments, setDepartments] = useState([])
  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      change: "+12%",
      icon: Users,
      page : "employees"
    },
    {
      title: "Departments",
      value: departments.length,
      change: "+2",
      icon: Building2,
      page : "departments"
    },
    {
      title: "Attendance Rate",
      value: "96%",
      change: "+4%",
      icon: CalendarCheck,
    },
    {
      title: "Leave Requests",
      value: "18",
      change: "-3",
      icon: FileText,
    },
  ];

  const activities = [
    {
      title: "New employee onboarded",
      description: "Sarah Johnson joined Engineering",
      time: "2 minutes ago",
    },
    {
      title: "Leave request submitted",
      description: "Michael Brown requested annual leave",
      time: "20 minutes ago",
    },
    {
      title: "Department updated",
      description: "Marketing department information updated",
      time: "1 hour ago",
    },
    {
      title: "Attendance report generated",
      description: "Monthly attendance report created",
      time: "3 hours ago",
    },
  ];

  const quickActions = [
    {
      title: "Add Employee",
      icon: UserPlus,
      onClick : setShowCreateEmployee,
    },
    {
      title: "Add Department",
      icon: FileText,
      onClick : setShowCreateDepartment
    },
  ];

  const employeesOnLeave = employees.find(employee=>employee.status ==="On Leave")



  const navigate = useNavigate()

  const fetchEmployees = async () => {
    const result = await api.get("/employee/get");
    setEmployees(result.data);
  };

  const fetchDepartments = async() =>{
    const result = await api.get("/dept/get")
    setDepartments(result.data)
  }

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  function isNewHire(employee) {
  const hireDate = new Date(employee.hireDate);
  const today = new Date();

  const diffInMs = today - hireDate;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays <= 30;
}

  useEffect(()=>{
    fetchEmployees();
    fetchDepartments();
  },[])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
              Employee Management System
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor employees, departments, attendance, and overall
              organizational performance.
            </p>
          </div>

          <button className="cursor-pointer flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
                  onClick={handleLogout}
          >
            Logout
            <LogOut size={18} />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                    <Icon size={22} className="text-slate-700" />
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    {stat.change}
                  </span>
                </div>

                <h3 className="mt-6 text-sm font-medium text-slate-500">
                  {stat.title}
                </h3>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <button
                className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                onClick={() => navigate(`/${stat.page}`)}
                >
                View
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Workforce Overview
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Employee growth and performance insights.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                  This Month
                </div>
              </div>

              <div className="flex h-[340px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">
                  <TrendingUp
                    size={40}
                    className="mx-auto text-slate-400"
                  />
                  <p className="mt-4 font-medium text-slate-600">
                    Analytics Section
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Add charts and visual reports here
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Quick Actions
              </h2>

              <div className="mt-6 space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.title}
                      className="cursor-pointer flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 text-left transition hover:border-slate-300 hover:bg-slate-50"
                      onClick={()=>action.onClick(true)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-slate-100 p-2">
                          <Icon size={18} />
                        </div>

                        <span className="font-medium text-slate-700">
                          {action.title}
                        </span>
                      </div>

                      <ArrowUpRight size={16} className="text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Clock3 size={20} className="text-slate-700" />

                <h2 className="text-xl font-bold text-slate-900">
                  Recent Activity
                </h2>
              </div>

              <div className="mt-6 space-y-5">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-slate-100 pb-5 last:border-none last:pb-0"
                  >
                    <div className="mt-2 h-2.5 w-2.5 rounded-full bg-slate-900" />

                    <div>
                      <h3 className="font-medium text-slate-800">
                        {activity.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {activity.description}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              New Hires
            </p>

            <h3 className="mt-3 text-4xl font-bold text-slate-900">
              {employees.filter(isNewHire).length}
            </h3>

            <p className="mt-2 text-sm text-emerald-600">
              +8% compared to last month
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Employees On Leave
            </p>

            <h3 className="mt-3 text-4xl font-bold text-slate-900">
              {employees.filter(employee=>employee.status==="On Leave").length}
            </h3>

            <p className="mt-2 text-sm text-amber-600">
              Currently unavailable
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Active Projects
            </p>

            <h3 className="mt-3 text-4xl font-bold text-slate-900">
              23
            </h3>

            <p className="mt-2 text-sm text-sky-600">
              Across all departments
            </p>
          </div>
        </div>
      </div>
      {showCreateEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <CreateEmployee onClose={() => setShowCreateEmployee(false)} refreshEmployees={fetchEmployees} />
        </div>
      )}
      {showCreateDepartment && (
        <CreateDepartment onClose={()=>setShowCreateDepartment(false)} refreshDepartments={fetchEmployees} />
      )}


    </div>
  );
}