function HealthBreakdown({

    breakdown,

}) {

    return (

        <div className="grid grid-cols-2 gap-4 mt-6">

            <Stat

                label="Active"

                value={breakdown.active}

            />

            <Stat

                label="Medium"

                value={breakdown.medium}

            />

            <Stat

                label="High"

                value={breakdown.high}

            />

            <Stat

                label="Critical"

                value={breakdown.critical}

            />

            <Stat

                label="Expired"

                value={breakdown.expired}

            />

        </div>

    );

}

function Stat({

    label,

    value,

}) {

    return (

        <div
            className="
                bg-gray-50
                rounded-lg
                p-3
            "
        >

            <p
                className="
                    text-xs
                    text-gray-500
                "
            >

                {label}

            </p>

            <p
                className="
                    text-xl
                    font-bold
                "
            >

                {value}

            </p>

        </div>

    );

}

export default HealthBreakdown;