import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import ActionButtons from "./ActionButtons";

function ComplianceRow({

    item,

    onDelete,

}) {

    return (

        <tr className="border-b hover:bg-gray-50">

            <td>{item.name}</td>

            <td>{item.category}</td>

            <td>{item.department}</td>

            <td>{item.expiry_date}</td>

            <td>

                <StatusBadge status={item.status} />

            </td>

            <td>

                <PriorityBadge priority={item.priority} />

            </td>

            <td>

                <ActionButtons

                    id={item.id}

                    onDelete={onDelete}

                />

            </td>

        </tr>

    );

}

export default ComplianceRow;