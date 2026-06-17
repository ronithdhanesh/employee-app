import WelcomeWidget from "./WelcomeWidget";
import CalenderWidget from "./CalenderWidget";
import AnnouncementsWidget from "./AnnouncementsWidget";
import LeaveSummaryWidget from "./LeaveSummaryWidget";
import UpcomingLeavesWidget from "./UpcomingLeavesWidget";

import api from "../../../api/axios";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [leaves, setLeaves] = useState([])

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (error) {
        console.error(
          "Failed to fetch user:",
          error
        );
      }
    }

    async function fetchLeaves() {
      try {
        const res = await api.get("/leave/my-leaves")
        setLeaves(res.data)
      }catch(err) {
        console.log(err);
      }
    }

    fetchUser();
    fetchLeaves()
  }, []);

  return (
    <main className="flex-1 p-6 lg:p-8">
      <div className="w-full space-y-6">
        <WelcomeWidget
          name={user?.name || ""}
          position={user?.position || ""}
          department={
            user?.department?.name || ""
          }
        />

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <CalenderWidget leaves={leaves}/>
          </div>

          <AnnouncementsWidget />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <LeaveSummaryWidget leaves={leaves}/>
          <UpcomingLeavesWidget leaves={leaves} />
        </div>
      </div>
    </main>
  );
}