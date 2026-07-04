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

function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    api.get("/dashboard/stats/")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <MainLayout>

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Compliance Dashboard
        </h1>

        <div className="mb-6">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-8">

          <div className="p-4 shadow rounded bg-white">
            <h2>Total Items</h2>
            <p className="text-2xl font-bold">
              {stats.total_items}
            </p>
          </div>

          <div className="p-4 shadow rounded bg-white">
            <h2>Expired</h2>
            <p className="text-2xl font-bold text-red-600">
              {stats.expired}
            </p>
          </div>

          <div className="p-4 shadow rounded bg-white">
            <h2>Expiring Soon</h2>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.expiring_soon}
            </p>
          </div>

          <div className="p-4 shadow rounded bg-white">
            <h2>Active</h2>
            <p className="text-2xl font-bold text-green-600">
              {stats.active}
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <h2 className="text-2xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <Link
            to="/compliance"
            className="p-5 rounded shadow bg-blue-500 text-white hover:bg-blue-600"
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
            className="p-5 rounded shadow bg-green-500 text-white hover:bg-green-600"
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