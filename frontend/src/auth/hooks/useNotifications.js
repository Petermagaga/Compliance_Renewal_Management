import { useCallback, useEffect, useState } from "react";
import notificationService from "../services/notificationService";

export default function useNotifications(filters = {}) {

    const [notifications, setNotifications] = useState([]);

    const [stats, setStats] = useState(null);

    const [unreadCount, setUnreadCount] = useState(0);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
    });

    const loadNotifications = useCallback(async () => {

        const response =
            await notificationService.getAll(filters);

        const payload = response.data?.data;

        if (Array.isArray(payload)) {

            setNotifications(payload);

            setPagination({
                count: payload.length,
                next: null,
                previous: null,
            });

            return;
        }

        setNotifications(payload?.results || []);

        setPagination({
            count: payload?.count || 0,
            next: payload?.next || null,
            previous: payload?.previous || null,
        });

    }, [JSON.stringify(filters)]);

    const loadStats = useCallback(async () => {

        const response =
            await notificationService.getStats();

        setStats(response.data?.data || null);

    }, []);

    const loadUnread = useCallback(async () => {

        const response =
            await notificationService.getUnreadCount();

        setUnreadCount(
            response.data?.data?.unread || 0
        );

    }, []);

    const refresh = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {

            await Promise.all([
                loadNotifications(),
                loadStats(),
                loadUnread(),
            ]);

        } catch (err) {

            console.error(
                "Failed to load notifications:",
                err
            );

            setError(err);

        } finally {

            setLoading(false);

        }

    }, [
        loadNotifications,
        loadStats,
        loadUnread,
    ]);

    const markRead = async (id) => {

        await notificationService.markRead(id);

        await refresh();

    };

    const markAllRead = async () => {

        await notificationService.markAllRead();

        await refresh();

    };

    const remove = async (id) => {

        await notificationService.delete(id);

        await refresh();

    };

    const clearRead = async () => {

        await notificationService.deleteRead();

        await refresh();

    };

    useEffect(() => {

        refresh();

    }, [refresh]);

    return {
        notifications,
        stats,
        unreadCount,
        pagination,
        loading,
        error,
        refresh,
        markRead,
        markAllRead,
        remove,
        clearRead,
    };
}