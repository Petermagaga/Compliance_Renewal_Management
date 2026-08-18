import ComplianceRow from "./ComplianceRow";

function ComplianceTable({
    items = [],
    onDelete,
}) {
    return (
        <div className="overflow-x-auto">

            <table className="min-w-full text-sm">

                <thead
                    className="
                        border-b
                        border-slate-200
                        text-left
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-slate-500
                    "
                >
                    <tr>

                        <th className="px-4 py-4">
                            Item Name
                        </th>

                        <th className="px-4 py-4">
                            Category
                        </th>

                        <th className="px-4 py-4">
                            Department
                        </th>

                        <th className="px-4 py-4">
                            Expiry Date
                        </th>

                        <th className="px-4 py-4">
                            Days Left
                        </th>

                        <th className="px-4 py-4">
                            Status
                        </th>

                        <th className="px-4 py-4">
                            Priority
                        </th>

                        <th className="px-4 py-4 text-right">
                            Actions
                        </th>

                    </tr>
                </thead>


                <tbody>

                    {items.length === 0 ? (

                        <tr>
                            <td
                                colSpan={8}
                                className="
                                    px-4
                                    py-12
                                    text-center
                                    text-sm
                                    text-slate-500
                                "
                            >
                                No recent compliance items.
                            </td>
                        </tr>

                    ) : (

                        items.map((item, index) => (

                            <ComplianceRow
                                key={item.id ?? index}
                                item={item}
                                onDelete={onDelete}
                            />

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default ComplianceTable;