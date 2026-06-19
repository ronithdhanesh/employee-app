import {
  LayoutDashboard,
  User,
  CalendarDays,
  Users,
  Settings,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Sidebar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col justify-between border-r border-slate-200 bg-white px-5 py-6 dark:border-slate-800 dark:bg-slate-950 overflow-y-auto">
      <div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            HRMS
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Employee Portal
          </p>
        </div>

        {/* Main */}
        <div>
          <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
            Main
          </p>

          <div className="space-y-1">
            <SidebarItem
              to="/"
              icon={LayoutDashboard}
              label="Dashboard"
            />

            <SidebarItem
              to="/profile"
              icon={User}
              label="Profile"
            />
          </div>
        </div>

        {/* Workspace */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
            Workspace
          </p>

          <div className="space-y-1">
            <SidebarItem
              to="/leaves"
              icon={CalendarDays}
              label="Leaves"
            />

            <SidebarItem
              to="/directory"
              icon={Users}
              label="Directory"
            />
          </div>
        </div>

        {/* Admin Only
        {user?.role === "admin" && (
          <div className="mt-8">
            <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
              Administration
            </p>

            <div className="space-y-1">
              <SidebarItem
                to="/employees"
                icon={Users}
                label="Employees"
              />

              <SidebarItem
                to="/departments"
                icon={Settings}
                label="Departments"
              />
            </div>
          </div>
        )} */}

        {/* Account */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
            Account
          </p>

          <div className="space-y-1">
            <SidebarItem
              to="/settings"
              icon={Settings}
              label="Settings"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              {user?.name || "Loading..."}
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {user?.position || user?.role || ""}
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-blue-950"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}

          <span className="font-medium">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-950"
        >
          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}