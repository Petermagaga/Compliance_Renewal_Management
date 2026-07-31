import { useMemo, useState } from "react";
import { FiCheck, FiTrash2 } from "react-icons/fi";

import MainLayout from "../components/layout/MainLayout";
import NotificationFilters from "../components/notifications/NotificationFilters";
import NotificationList from "../components/notifications/NotificationList";
import NotificationStats from "../components/notifications/NotificationStats";

import useNotifications from "../hooks/useNotifications";
import useNotifications
function NotificationCenter() {

    const [activeFilter, setActiveFilter] =
        useState("all");

    const filters = useMemo(() => {

        switch (activeFilter) {

            case "unread":
                return {
                    unread: "true",
                };

            case "email":
                return {
                    channel: "email",
                };

            case "whatsapp":
                return {
                    channel: "whatsapp",
                };

            case "sent":
                return {
                    status: "sent",
                };

            case "failed":
                return {
                    status: "failed",
                };

            case "all":
            default:
                return {};

        }

    }, [activeFilter]);

    const {
        notifications,
        stats,
        loading,
        error,
        markRead,
        markAllRead,
        remove,
        clearRead,
    } = useNotifications(filters);

    return (
        <MainLayout>

            <div className="p-8">

                {/* Header */}

                <div
                    className="
                        mb-8
                        flex
                        flex-col
                        gap-4
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div>

                        <p className="text-sm font-medium text-brand-green">
                            Communication Center
                        </p>

                        <h1 className="mt-1 text-3xl font-bold text-gray-900">
                            Notifications
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Monitor compliance reminders,
                            delivery status and alerts.
                        </p>

                    </div>

                    <div className="flex flex-wrap gap-2">

                        <button
                            type="button"
                            onClick={markAllRead}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-gray-700
                                hover:bg-gray-50
                            "
                        >
                            <FiCheck size={16} />
                            Mark All Read
                        </button>

                        <button
                            type="button"
                            onClick={clearRead}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                border
                                border-red-200
                                bg-white
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-red-600
                                hover:bg-red-50
                            "
                        >
                            <FiTrash2 size={16} />
                            Clear Read
                        </button>

                    </div>

                </div>

                {/* Statistics */}

                <div className="mb-8">

                    <NotificationStats
                        stats={stats}
                    />

                </div>

                {/* Filters */}

                <div
                    className="
                        mb-6
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-4
                    "
                >

                    <NotificationFilters
                        activeFilter={activeFilter}
                        onChange={setActiveFilter}
                    />

                </div>

                {/* Error */}

                {error && (
                    <div
                        className="
                            mb-6
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            p-4
                            text-sm
                            text-red-700
                        "
                    >
                        Unable to load notifications.
                        Please try again.
                    </div>
                )}

                {/* List */}

                <NotificationList
                    notifications={notifications}
                    loading={loading}
                    onRead={markRead}
                    onDelete={remove}
                />

            </div>

        </MainLayout>
    );
}

export default NotificationCenter;