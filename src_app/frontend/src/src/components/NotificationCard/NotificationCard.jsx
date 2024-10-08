import { trpc } from "../../lib/trpc";
import Button from "../Button/Button";
import './NotificationCard.css'

export default function NotificationCard({notification, onRead}) {
  const readNotification = async () => {
    try {
      const { id } = notification;
      await trpc.notification.delete.mutate({ id });

      onRead(notification)
      
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <div className="notification-card">
      <h3 className="title">{notification.title}</h3>
      <p>{notification.message}</p>
      <Button onClick={readNotification} >Letta</Button>
    </div>
  );
}
