import Button from "../Button/Button";

export default function NotificationCard({notification, onComplete}) {
  return (
    <div className="notification-card">
      <h3>{notification.title}</h3>
      <p>{notification.message}</p>
      <Button onClick={() => onComplete(notification)} >Completed</Button>
    </div>
  );
}
