function HealthBreakdown({ breakdown }) {

    const stats = [
        {
            label: "Active",
            value: breakdown.active,
        },
        {
            label: "Medium",
            value: breakdown.medium,
        },
        {
            label: "High",
            value: breakdown.high,
        },
        {
            label: "Critical",
            value: breakdown.critical,
        },
        {
            label: "Expired",
            value: breakdown.expired,
        },
    ];

    return (
        <div>

            <div className="mb-4">

                <h3 className="text-sm font-semibold text-slate-900">
                    Risk Breakdown
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                    Current distribution of compliance risk.
                </p>

            </div>

            <div className="divide-y divide-slate-100">

                {stats.map((stat) => (

                    <div
                        key={stat.label}
                        className="
                            flex
                            items-center
                            justify-between
                            py-3
                        "
                    >

                        <span className="text-sm text-slate-600">
                            {stat.label}
                        </span>

                        <span
                            className="
                                text-sm
                                font-semibold
                                text-slate-900
                            "
                        >
                            {stat.value}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default HealthBreakdown;