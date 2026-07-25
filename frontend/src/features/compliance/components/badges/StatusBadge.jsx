const STATUS_STYLES = {

    active: {
        label: "Active",
        className: "bg-green-100 text-green-700",
    },

    expiring: {
        label: "Expiring",
        className: "bg-yellow-100 text-yellow-700",
    },

    expired: {
        label: "Expired",
        className: "bg-red-100 text-red-700",
    },

    renewed: {
        label: "Renewed",
        className: "bg-blue-100 text-blue-700",
    },

};

function StatusBadge({ status }) {

    const config = STATUS_STYLES[status] || {
        label: status,
        className: "bg-gray-100 text-gray-700",
    };

    return (

        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}
        >
            {config.label}
        </span>

    );

}

export default StatusBadge;