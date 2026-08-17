import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#16a34a",
    "#facc15",
    "#ef4444",
];

function StatusPieChart({ data = [] }) {
    return (
        <div className="w-full">

            <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-900">
                    Compliance Status
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Current distribution of compliance items.
                </p>
            </div>

            <div className="h-[270px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={3}
                            cx="50%"
                            cy="50%"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        COLORS[index % COLORS.length]
                                    }
                                />
                            ))}
                        </Pie>

                        <Tooltip />

                        <Legend
                            verticalAlign="bottom"
                            height={30}
                        />

                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default StatusPieChart;