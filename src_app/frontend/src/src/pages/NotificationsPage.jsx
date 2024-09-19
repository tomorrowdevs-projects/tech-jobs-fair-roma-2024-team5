import { useEffect, useState } from "react";
import { trpc } from "../lib/trpc";
import NotificationCard from "../components/NotificationCard/NotificationCard";
import BackNavigationLink from "../components/BackNavigationLink/BackNavigationLink";

export default function NotificationsPage() {
  /**@type {[Awaited<ReturnType<typeof trpc.notification.find.query>>, any]} */
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const allNotifications = await trpc.notification.find.query();
      setNotifications(allNotifications);
    } catch (ex) {
      console.error(ex);
    }
  };

  const onRead = (notification) => {
    setNotifications(notifications.filter((n) => n.id !== notification.id));
  };

  return (
    <div className="container">
      <div className="mb-5">
        <BackNavigationLink href={"/"}></BackNavigationLink>
      </div>
      <div>
        {notifications.map((notification, index) => (
          <div key={index}>
            <NotificationCard
              notification={notification}
              onRead={onRead}
            ></NotificationCard>
          </div>
        ))}
        {!notifications.length && (
          <div className="text-center mt-3">
            Non ci sono notifiche al momento
          </div>
        )}
      </div>
    </div>
  );
}
