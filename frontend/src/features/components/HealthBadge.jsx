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
                rounded-full
                px-3
                py-1.5
                text-sm
                font-semibold
                shadow-sm
                ${colors[color] || colors.red}
            `}
        >
            {rating}
        </span>
    );
}

export default HealthBadge;