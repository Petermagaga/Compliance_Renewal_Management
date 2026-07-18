import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import notificationService from "../services/notificationService";
const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {

    const [notifications, setNotifications] = useState([]);

    const [unreadCount, setUnreadCount] = useState(0);

    const [loading, setLoading] = useState(false);

    return (

        <NotificationContext.Provider
            value={{}}
        >

            {children}

        </NotificationContext.Provider>

    );

}

const fetchNotifications = async () => {

    try {

        setLoading(true);

        const response =
            await notificationService.getNotifications();

        setNotifications(response.data);

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }

};

const fetchUnreadCount = async () => {

    try {

        const response =
            await notificationService.getUnreadCount();

        setUnreadCount(response.data.unread);

    } catch (error) {

        console.error(error);

    }

};

const refresh = async () => {

    await Promise.all([

        fetchNotifications(),

        fetchUnreadCount(),

    ]);

};

const markAsRead = async (id) => {

    await notificationService.markAsRead(id);

    await refresh();

};

const markAllAsRead = async () => {

    await notificationService.markAllAsRead();

    await refresh();

};

useEffect(() => {

    refresh();

}, []);