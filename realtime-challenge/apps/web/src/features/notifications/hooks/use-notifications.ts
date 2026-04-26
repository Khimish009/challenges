import type { INotification } from "@repo/shared"
import { useCallback, useEffect, useState } from "react"
import { useTransportContext } from "../context"

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<INotification[]>([])
    const { transport } = useTransportContext()

    const handlerNotification = useCallback((notification: INotification) => {
        setNotifications((preNotifications) => [...preNotifications, notification])
    }, [])

    useEffect(() => {
        transport.on("notification", handlerNotification)

        return () => transport.off("notification", handlerNotification)
    }, [transport, handlerNotification])

    return notifications
}