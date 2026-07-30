function NotificationBadge({ count }) {

    if (!count || count <= 0) {
        return null;
    }

    const displayCount =
        count > 99 ? "99+" : count;

    return (
        <span
            className="
                absolute
                -right-1
                -top-1
                flex
                min-h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                bg-red-500
                px-1
                text-[10px]
                font-bold
                text-white
                ring-2
                ring-white
            "
        >
            {displayCount}
        </span>
    );
}

export default NotificationBadge;