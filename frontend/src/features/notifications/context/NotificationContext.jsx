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

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationService.getUnreadCount();
      setUnreadCount(response.data.unread);
    } catch (error) {
      console.error(error);
    }
  };

  const refresh = async () => {
    await Promise.all([fetchNotifications(), fetchUnreadCount()]);
  };

  const markAsRead = async (id) => {
    const previousNotifications = notifications;
    const previousUnreadCount = unreadCount;

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      )
    );
    setUnreadCount((prev) => Math.max(prev - 1, 0));

    try {
      await notificationService.markAsRead(id);
    } catch (error) {
      setNotifications(previousNotifications);
      setUnreadCount(previousUnreadCount);
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    await notificationService.markAllAsRead();
    await refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    fetchUnreadCount,
    refresh,
    markAsRead,
    markAllAsRead,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}
