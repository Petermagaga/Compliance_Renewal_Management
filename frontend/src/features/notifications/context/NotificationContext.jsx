import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import notificationService from "../services/notificationService";
import { useAuth } from "../../../context/AuthContext";
const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();   // ✅ check auth state

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getNotifications();
      
      console.log(data);
      
      setNotifications(
          Array.isArray(data)
              ? data
              : data.results ?? []
      );
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationService.getUnreadCount();
      setUnreadCount(response.unread);
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
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
    try {
      await notificationService.markAllAsRead();
      await refresh();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  // ✅ only refresh when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      refresh();
    }
  }, [isAuthenticated]);

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

  const deleteNotification = async (id) => {

      try {

          await notificationService.deleteNotification(id);

          setNotifications(prev =>
              prev.filter(item => item.id !== id)
          );

          setUnreadCount(prev => {

              const notification = notifications.find(
                  n => n.id === id
              );

              if (notification && !notification.is_read) {
                  return Math.max(prev - 1, 0);
              }

              return prev;

          });

      } catch (error) {

          console.error(error);

      }

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
