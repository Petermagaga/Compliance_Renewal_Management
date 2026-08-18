function ComplianceTable({ items = [] }) {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-6">
                Recent Compliance Items
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full text-sm">

                    <thead
                        className="
                            text-left
                            text-gray-500
                            border-b
                        "
                    >
                        <tr>

                            <th className="pb-3">
                                Item Name
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Department
                            </th>

                            <th>
                                Expiry Date
                            </th>

                            <th>
                                Days Left
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Priority
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {items.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="
                                        py-8
                                        text-center
                                        text-gray-500
                                    "
                                >
                                    No compliance items found.
                                </td>

                            </tr>

                        ) : (

                            items.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b"
                                >

                                    <td className="py-4">
                                        {item.name}
                                    </td>

                                    <td className="capitalize">
                                        {item.category}
                                    </td>

                                    <td>
                                        {item.department_name}
                                    </td>

                                    <td>
                                        {item.expiry_date}
                                    </td>

                                    <td>
                                        {item.days_remaining}
                                    </td>

                                    <td>

                                        <span
                                            className="
                                                rounded-full
                                                bg-yellow-100
                                                px-3
                                                py-1
                                                text-xs
                                                text-yellow-700
                                            "
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className="
                                                rounded-full
                                                bg-red-100
                                                px-3
                                                py-1
                                                text-xs
                                                text-red-500
                                            "
                                        >
                                            {item.priority}
                                        </span>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ComplianceTable;