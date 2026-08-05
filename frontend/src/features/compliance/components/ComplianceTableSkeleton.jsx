function ComplianceTableSkeleton() {
    return (

        <div
            className="
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
            "
        >

            {/* Header */}

            <div
                className="
                    grid
                    grid-cols-7
                    gap-4
                    border-b
                    bg-gray-50
                    px-6
                    py-4
                "
            >

                {

                    [...Array(7)].map((_, index) => (

                        <div
                            key={index}
                            className="
                                h-4
                                animate-pulse
                                rounded
                                bg-gray-200
                            "
                        />

                    ))

                }

            </div>

            {/* Rows */}

            {

                [...Array(8)].map((_, row) => (

                    <div
                        key={row}
                        className="
                            grid
                            grid-cols-7
                            gap-4
                            border-b
                            px-6
                            py-5
                        "
                    >

                        {

                            [...Array(7)].map((_, col) => (

                                <div
                                    key={col}
                                    className="
                                        h-4
                                        animate-pulse
                                        rounded
                                        bg-gray-100
                                    "
                                />

                            ))

                        }

                    </div>

                ))

            }

        </div>

    );
}

export default ComplianceTableSkeleton;