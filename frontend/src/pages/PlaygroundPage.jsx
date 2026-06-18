import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 ml-72">
        <Outlet />
      </main>
    </div>
  );
}