const progressColors = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
};

function HealthProgressBar({
    score,
    color,
}) {
    return (
        <div className="mt-2">

            <div
                className="
                    h-3
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-gray-200
                "
            >
                <div
                    className={`
                        h-full
                        rounded-full
                        transition-all
                        duration-700
                        ease-out
                        ${progressColors[color]}
                    `}
                    style={{
                        width: `${score}%`,
                    }}
                />

            </div>

        </div>
    );
}

export default HealthProgressBar;