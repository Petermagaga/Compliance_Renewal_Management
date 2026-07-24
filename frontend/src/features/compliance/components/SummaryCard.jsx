import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function SummaryCard({ item }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <div className="grid md:grid-cols-4 gap-6">

                <div>

                    <p className="text-gray-500">

                        Status

                    </p>

                    <StatusBadge status={item.status} />

                </div>

                <div>

                    <p className="text-gray-500">

                        Priority

                    </p>

                    <PriorityBadge priority={item.priority} />

                </div>

                <div>

                    <p className="text-gray-500">

                        Category

                    </p>

                    <p className="font-semibold">

                        {item.category}

                    </p>

                </div>

                <div>

                    <p className="text-gray-500">

                        Department

                    </p>

                    <p className="font-semibold">

                        {item.department_name}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default SummaryCard;