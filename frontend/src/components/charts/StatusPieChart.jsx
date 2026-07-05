import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const COLORS = ["#16a34a", "#facc15", "#ef4444"];

function StatusPieChart({ stats }) {
  const data = [
    { name: "Active", value: stats.active },
    { name: "Expiring", value: stats.expiring_soon },
    { name: "Expired", value: stats.expired },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[360px]">
      <h2 className="text-xl font-semibold mb-6">
        Compliance Status Distribution
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie data={data} innerRadius={70} outerRadius={110} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusPieChart;