import { useMemo, useState } from "react";

import MainLayout from "../components/layout/MainLayout"

import { useNotifications } from "../context/NotificationContext";

import NotificationStats from "../features/notifications/components/NotificationStats"

import NotificationToolbar from "../components/NotificationToolbar";
import NotificationList from "../components/NotificationList";

function NotificationCenter() {

    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [sort, setSort] = useState("newest");

    const {
        notifications,
        stats,
        loading,
        error,
        markAsRead,
        markAllAsRead,
        remove,
        clearRead,
    } = useNotifications();

    const filteredNotifications = useMemo(() => {

        let results = [...notifications];

        /* Search */

        if (search.trim()) {

            const query = search.toLowerCase();

            results = results.filter(notification =>

                notification.title
                    .toLowerCase()
                    .includes(query)

                ||

                notification.message
                    .toLowerCase()
                    .includes(query)

            );

        }

        /* Filter */

        switch (activeFilter) {

            case "unread":

                results = results.filter(
                    n => !n.is_read
                );

                break;

            case "email":

                results = results.filter(
                    n => n.channel === "email"
                );

                break;

            case "whatsapp":

                results = results.filter(
                    n => n.channel === "whatsapp"
                );

                break;

            case "system":

                results = results.filter(
                    n => n.channel === "system"
                );

                break;

            default:
                break;

        }

        /* Sort */

        switch (sort) {

            case "oldest":

                results.sort(
                    (a, b) =>
                        new Date(a.created_at) -
                        new Date(b.created_at)
                );

                break;

            case "unread":

                results.sort(
                    (a, b) =>
                        Number(a.is_read) -
                        Number(b.is_read)
                );

                break;

            default:

                results.sort(
                    (a, b) =>
                        new Date(b.created_at) -
                        new Date(a.created_at)
                );

        }

        return results;

    }, [
        notifications,
        search,
        activeFilter,
        sort,
    ]);

    return (

        <MainLayout>

            <div className="space-y-8 p-8">

                {/* Header */}

                <div>

                    <p className="text-sm font-semibold text-brand-green">

                        Communication Center

                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-slate-900">

                        Notifications

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Search, filter and manage every
                        compliance notification from one place.

                    </p>

                </div>

                <NotificationStats
                    stats={stats}
                />

                <NotificationToolbar

                    search={search}
                    onSearch={setSearch}

                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}

                    sort={sort}
                    onSortChange={setSort}

                    onMarkAllRead={markAllAsRead}

                    onClearRead={clearRead}

                />

                {error && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                            p-5
                            text-red-700
                        "
                    >
                        Unable to load notifications.

                    </div>

                )}

                <NotificationList

                    notifications={filteredNotifications}

                    loading={loading}

                    onRead={markAsRead}

                    onDelete={remove}

                />

            </div>

        </MainLayout>

    );

}

export default NotificationCenter;