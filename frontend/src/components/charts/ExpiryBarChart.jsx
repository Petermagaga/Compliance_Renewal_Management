import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


function ExpiryBarChart({ data = [] }) {

    const chartData = data.map((item) => ({
        range:
            item.range ??
            item.label ??
            item.name ??
            "Unknown",

        items:
            item.items ??
            item.count ??
            item.value ??
            0,
    }));


    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
            "
        >

            <div className="mb-6">

                <h2
                    className="
                        text-lg
                        font-semibold
                        text-slate-900
                    "
                >
                    Items Expiring in Next 90 Days
                </h2>

                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-500
                    "
                >
                    Compliance items grouped by remaining days.
                </p>

            </div>


            {chartData.length === 0 ? (

                <div
                    className="
                        flex
                        h-[280px]
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-dashed
                        border-slate-200
                        bg-slate-50
                    "
                >

                    <div className="text-center">

                        <p
                            className="
                                text-sm
                                font-semibold
                                text-slate-700
                            "
                        >
                            No expiry data available
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-400
                            "
                        >
                            Expiry distribution will appear here.
                        </p>

                    </div>

                </div>

            ) : (

                <div className="h-[280px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -10,
                                bottom: 5,
                            }}
                        >

                            <XAxis
                                dataKey="range"
                                tick={{
                                    fontSize: 12,
                                }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{
                                    fontSize: 12,
                                }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="items"
                                fill="#16a34a"
                                radius={[
                                    8,
                                    8,
                                    0,
                                    0,
                                ]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>
    );
}


export default ExpiryBarChart;