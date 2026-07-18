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