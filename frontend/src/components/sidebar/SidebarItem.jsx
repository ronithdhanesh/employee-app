import { NavLink } from "react-router-dom";

export default function SidebarItem({
  to,
  icon: Icon,
  label,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
          isActive
            ? "bg-slate-900 text-white shadow-sm dark:bg-blue-600"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        }`
      }
    >
      <Icon
        size={20}
        className="transition-transform group-hover:scale-110"
      />

      <span className="font-medium">
        {label}
      </span>
    </NavLink>
  );
}