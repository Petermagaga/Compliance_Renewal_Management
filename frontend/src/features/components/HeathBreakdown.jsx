function HealthBreakdown({ breakdown }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Stat label="Active" value={breakdown.active} />
            <Stat label="Medium" value={breakdown.medium} />
            <Stat label="High" value={breakdown.high} />
            <Stat label="Critical" value={breakdown.critical} />
            <Stat label="Expired" value={breakdown.expired} />
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div
            className="
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-4
                transition
                duration-300
                hover:border-green-300
                hover:bg-white
                hover:shadow-md
            "
        >
            <p
                className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-wide
                    text-gray-500
                "
            >
                {label}
            </p>

            <p
                className="
                    mt-2
                    text-3xl
                    font-bold
                    text-gray-900
                "
            >
                {value}
            </p>
        </div>
    );
}

export default HealthBreakdown;