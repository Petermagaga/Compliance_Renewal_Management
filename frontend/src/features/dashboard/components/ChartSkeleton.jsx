function ChartSkeleton() {
    return (
        <div
            className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-6
            "
        >
            {[1, 2].map((item) => (
                <div
                    key={item}
                    className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-6
                        shadow-sm
                        animate-pulse
                    "
                >
                    {/* Header */}
                    <div className="mb-6">
                        <div className="h-5 w-40 rounded bg-gray-200" />
                        <div className="mt-2 h-3 w-28 rounded bg-gray-100" />
                    </div>

                    {/* Chart */}
                    <div
                        className="
                            flex
                            h-72
                            items-end
                            justify-center
                            gap-3
                        "
                    >
                        <div className="h-24 w-8 rounded bg-gray-200" />
                        <div className="h-40 w-8 rounded bg-gray-200" />
                        <div className="h-52 w-8 rounded bg-gray-200" />
                        <div className="h-32 w-8 rounded bg-gray-200" />
                        <div className="h-60 w-8 rounded bg-gray-200" />
                        <div className="h-44 w-8 rounded bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChartSkeleton;