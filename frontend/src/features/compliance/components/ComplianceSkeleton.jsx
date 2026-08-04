function ComplianceSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-gray-100 p-5">
                <div className="h-6 w-56 animate-pulse rounded bg-gray-200" />
                <div className="mt-3 h-4 w-80 animate-pulse rounded bg-gray-100" />
            </div>

            {/* Table */}
            <div className="divide-y divide-gray-100">

                {[...Array(6)].map((_, index) => (

                    <div
                        key={index}
                        className="grid grid-cols-6 items-center gap-6 px-6 py-5"
                    >
                        <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />

                        <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />

                        <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200" />

                        <div className="h-7 w-20 animate-pulse rounded-full bg-gray-100" />

                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                        <div className="flex justify-end gap-3">
                            <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
                            <div className="h-8 w-8 animate-pulse rounded bg-gray-100" />
                        </div>
                    </div>

                ))}

            </div>

        </div>
    );
}

export default ComplianceSkeleton;