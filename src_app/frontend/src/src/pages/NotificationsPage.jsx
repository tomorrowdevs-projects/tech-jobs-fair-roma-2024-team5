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

  const readNotification = async (notification) => {
    try {
      const { habitScheduleId, id } = notification;
      await trpc.habit.addCompletion.mutate({ habitScheduleId, value: 1 });
      await trpc.notification.delete.mutate({ id });

      setNotifications(notifications.filter(n => n.id !== id));
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <div className="container">
      <BackNavigationLink href={'/'}></BackNavigationLink>
      <div>
        {notifications.map((notification, index) => (
          <div key={index}>
            <NotificationCard notification={notification} onComplete={readNotification}></NotificationCard>
          </div>
        ))}
        {!notifications.length && <div className="text-center mt-3">There are no notifications are the moment</div>}
      </div>
    </div>
  );
}
