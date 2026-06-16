import WelcomeWidget from "./WelcomeWidget";
import CalenderWidget from "./CalenderWidget";
import AnnouncementsWidget from "./AnnouncementsWidget";
import LeaveSummaryWidget from "./LeaveSummaryWidget";
import UpcomingLeavesWidget from "./UpcomingLeavesWidget";

export default function Dashboard() {
  return (
    <main className="flex-1 p-6 lg:p-8">
      <div className="w-full space-y-6">

        <WelcomeWidget />

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <CalenderWidget />
          </div>

          <AnnouncementsWidget />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <LeaveSummaryWidget />
          <UpcomingLeavesWidget />
        </div>

      </div>
    </main>
  );
}