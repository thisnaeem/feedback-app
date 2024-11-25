import DesignMetrics from "./components/dashboard/DesignMetrics";
import TeamActivity from "./components/dashboard/TeamActivity";
import DashboardOverview from "./components/DashboardOverview";
import RecentActivity from "./components/RecentActivity";

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DashboardOverview />
          <DesignMetrics />
        </div>
        <div className="space-y-6">
          <RecentActivity />
          <TeamActivity />
        </div>
      </div>
    </div>
  );
}
