import type { INotification } from "@repo/shared"

export const NotificationItem = ({ notification }: { notification: INotification }) => {
    return (
        <div>
            <div>{notification.title}</div>
            <div>{notification.message}</div>
            <div>{notification.priority}</div>
            <div>{notification.type}</div>
            <div>{notification.read}</div>
        </div>
    )
}