// pages/DesignPlayground.jsx

import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function PlaygroundPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <Outlet />
    </div>
  );
}