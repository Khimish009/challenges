import { useNotifications } from "../hooks"
import { NotificationItem } from "./notification-item"

export const NotificationList = () => {
    const notifications = useNotifications()

    return (
        <div>
            {notifications.map((notification) => (<NotificationItem key={notification.id} notification={notification} />))}
        </div>
    )
}