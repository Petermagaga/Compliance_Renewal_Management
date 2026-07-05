import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/layout/MainLayout";
import StatCard from "../components/dashboard/StatCard";



import {
  FiShield,
  FiClock,
  FiAlertTriangle,
  FiCheckCircle
} from "react-icons/fi";

import StatusPieChart from "../components/charts/StatusPieChart";
import ExpiryBarChart from "../components/charts/ExpiryBarChart";
import ComplianceTable from "../components/compliance/ComplianceTable";
import RemindersPanel from "../components/compliance/RemindersPanel";
import QuickActions from "../components/compliance/QuickActions";



function Dashboard() {
  const [stats, setStats] = useState(null);
  const [items, setItems] =useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {

    try {

      const [statsRes, itemsRes] = await Promise.all([

        api.get("/dashboard/stats/"),
        api.get("/compliance/items/")

      ]);

      setStats(statsRes.data);
      setItems(itemsRes.data);

    }

    catch (error) {

      console.error(error);

    }

  };

if (!stats) {
  return (
    <MainLayout>
      <div className="p-8">
        Loading dashboard...
      </div>
    </MainLayout>
  );
}
return (
  <MainLayout>

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Compliance Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Compliance Items"
          value={stats.total_items}
          subtitle="All registered items"
          icon={<FiShield size={24} className="text-white" />}
          color="bg-brand-green"
        />

        <StatCard
          title="Expiring Soon (≤ 60 days)"
          value={stats.expiring_soon}
          subtitle="Need attention"
          icon={<FiClock size={24} className="text-white" />}
          color="bg-brand-yellow"
        />

        <StatCard
          title="Expired Items"
          value={stats.expired}
          subtitle="Requires immediate action"
          icon={<FiAlertTriangle size={24} className="text-white" />}
          color="bg-red-500"
        />

        <StatCard
          title="Active / Safe Items"
          value={stats.active}
          subtitle="Up to date"
          icon={<FiCheckCircle size={24} className="text-white" />}
          color="bg-green-500"
        />

      </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <StatusPieChart stats={stats} />
      <ExpiryBarChart items={items} />
    </div>


    <div className="grid grid-cols-12 gap-6">

      <div className="col-span-8">
        <ComplianceTable  items={items} />
      </div>

      <div className="col-span-4 space-y-6">
        <RemindersPanel items={items} />
        <QuickActions />
      </div>

    </div>

      {/* Quick Actions */}

      <h2 className="text-2xl font-semibold mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Link
          to="/compliance"
          className="p-5 rounded-xl shadow bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <h3 className="text-lg font-bold">
            Compliance Items
          </h3>

          <p>
            View all permits, licenses and certificates
          </p>

        </Link>

        <Link
          to="/add-item"
          className="p-5 rounded-xl shadow bg-green-600 text-white hover:bg-green-700 transition"
        >
          <h3 className="text-lg font-bold">
            Add Compliance Item
          </h3>

          <p>
            Create a new compliance record
          </p>

        </Link>

      </div>

    </div>

  </MainLayout>
);

}

export default Dashboard;