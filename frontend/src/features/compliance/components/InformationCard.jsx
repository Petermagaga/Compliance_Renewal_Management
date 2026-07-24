function InformationCard({ item }) {

    const rows = [

        ["Name", item.name],

        ["Responsible Person", item.responsible_person],

        ["Issue Date", item.issue_date],

        ["Expiry Date", item.expiry_date],

        ["Status", item.status],

        ["Priority", item.priority],

    ];

    return (

        <div className="bg-white rounded-xl shadow">

            <div className="border-b p-5">

                <h2 className="text-xl font-bold">

                    General Information

                </h2>

            </div>

            <div className="divide-y">

                {rows.map(([label, value]) => (

                    <div

                        key={label}

                        className="grid grid-cols-3 p-4"

                    >

                        <div className="font-semibold text-gray-600">

                            {label}

                        </div>

                        <div className="col-span-2">

                            {value || "-"}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default InformationCard;