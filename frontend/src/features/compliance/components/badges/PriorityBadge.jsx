const PRIORITY_STYLES = {

    low: {
        label: "Low",
        className: "bg-gray-100 text-gray-700",
    },

    medium: {
        label: "Medium",
        className: "bg-blue-100 text-blue-700",
    },

    high: {
        label: "High",
        className: "bg-orange-100 text-orange-700",
    },

    critical: {
        label: "Critical",
        className: "bg-red-100 text-red-700",
    },

};

function PriorityBadge({ priority }) {

    const config = PRIORITY_STYLES[priority] || {
        label: priority,
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

export default PriorityBadge;