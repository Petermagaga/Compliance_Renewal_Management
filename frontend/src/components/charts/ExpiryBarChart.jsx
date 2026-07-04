import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { range: "0-7", items: 7 },
  { range: "8-30", items: 12 },
  { range: "31-60", items: 15 },
  { range: "61-90", items: 10 },
];

function ExpiryBarChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[360px]">
      <h2 className="text-xl font-semibold mb-6">
        Items Expiring in Next 90 Days
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="items" fill="#16a34a" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpiryBarChart;