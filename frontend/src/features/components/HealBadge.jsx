function HealthBadge({ rating, color }) {

    const colors = {

        green: "bg-green-100 text-green-700",

        yellow: "bg-yellow-100 text-yellow-700",

        orange: "bg-orange-100 text-orange-700",

        red: "bg-red-100 text-red-700",

    };

    return (

        <span
            className={`
                inline-flex
                items-center
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
                ${colors[color] || colors.red}
            `}
        >

            {rating}

        </span>

    );

}

export default HealthBadge;