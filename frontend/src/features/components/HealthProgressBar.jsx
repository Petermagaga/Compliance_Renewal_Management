const progressColors = {

    green: "bg-green-500",

    yellow: "bg-yellow-500",

    orange: "bg-orange-500",

    red: "bg-red-500",

};

function HealthProgressBar({ score, 
   color,
}) {

    return (

        <div>

            <div
                className="
                    w-full
                    bg-gray-200
                    rounded-full
                    h-3
                    mt-4
                "
            >

                <div


            className={`

                h-3

                rounded-full

                ${progressColors[color]}

            `}

                    style={{

                        width: `${score}%`

                    }}

                />

            </div>

        </div>

    );

}

export default HealthProgressBar;