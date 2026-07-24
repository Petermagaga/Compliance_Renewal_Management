function StatusBadge({ status }) {

    const colors = {

        active: "bg-green-100 text-green-700",

        expiring: "bg-yellow-100 text-yellow-700",

        expired: "bg-red-100 text-red-700",

        renewed: "bg-blue-100 text-blue-700",

    };

    return (

        <span

            className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}

        >

            {status}

        </span>

    );

}

export default StatusBadge;