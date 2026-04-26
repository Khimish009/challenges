import type { INotification } from "@repo/shared"
import { useCallback, useEffect, useState } from "react"
import { useTransportContext } from "../context"

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<INotification[]>([])
    const { transport } = useTransportContext()

    const handlerNotifications = useCallback((notification: INotification) => {
        setNotifications((preNotifications) => [...preNotifications, notification])
    }, [])

    useEffect(() => {
        transport.on("notification", handlerNotifications)

        return () => transport.off("notification", handlerNotifications)
    }, [transport, handlerNotifications])

    return {
        notifications
    }
}