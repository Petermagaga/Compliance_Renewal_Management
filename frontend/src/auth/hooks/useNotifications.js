import { useEffect, useState } from "react";
import notificationService from "../../services/notificationService";
export default function useNotifications(filters = {}) {

    const [notifications, setNotifications] = useState([]);

    const [stats, setStats] = useState(null);

    const [unreadCount, setUnreadCount] = useState(0);

    const [loading, setLoading] = useState(true);

    async function loadNotifications() {

        setLoading(true);

        try {

            const response =
                await notificationService.getAll(filters);

            setNotifications(response.data.data);

        } finally {

            setLoading(false);

        }

    }

    async function loadStats() {

        const response =
            await notificationService.getStats();

        setStats(response.data.data);

    }

    async function loadUnread() {

        const response =
            await notificationService.getUnreadCount();

        setUnreadCount(response.data.data.unread);

    }

    async function refresh() {

        await Promise.all([

            loadNotifications(),

            loadStats(),

            loadUnread(),

        ]);

    }

    async function markRead(id) {

        await notificationService.markRead(id);

        refresh();

    }

    async function markAllRead() {

        await notificationService.markAllRead();

        refresh();

    }

    async function remove(id) {

        await notificationService.delete(id);

        refresh();

    }

    async function clearRead() {

        await notificationService.deleteRead();

        refresh();

    }

    useEffect(() => {

        refresh();

    }, [JSON.stringify(filters)]);

    return {

        notifications,

        stats,

        unreadCount,

        loading,

        refresh,

        markRead,

        markAllRead,

        remove,

        clearRead,

    };

}