export default function NotificationBadge({ count }) {

    if (!count) return null;

    return (

        <span className="notification-badge">

            {count}

        </span>

    );

}