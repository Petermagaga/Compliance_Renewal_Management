import ComplianceRow from "./ComplianceRow";

function ComplianceTable({

    items,
    onDelete,

}) {

    return (

        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
            "
        >

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead
                        className="
                            border-b
                            bg-gray-50
                            text-left
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-gray-500
                        "
                    >

                        <tr>

                            <th className="px-6 py-4">
                                Compliance
                            </th>

                            <th className="px-6 py-4">
                                Category
                            </th>

                            <th className="px-6 py-4">
                                Department
                            </th>

                            <th className="px-6 py-4">
                                Expiry
                            </th>

                            <th className="px-6 py-4">
                                Status
                            </th>

                            <th className="px-6 py-4">
                                Priority
                            </th>

                            <th className="px-6 py-4 text-right">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {items.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="py-12 text-center text-gray-500"
                                >

                                    No compliance items found.

                                </td>

                            </tr>

                        ) : (

                            items.map(item => (

                                <ComplianceRow
                                    key={item.id}
                                    item={item}
                                    onDelete={onDelete}
                                />

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ComplianceTable;