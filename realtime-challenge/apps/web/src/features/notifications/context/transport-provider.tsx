import { TransportType } from "@repo/shared"
import { useCallback, useMemo, useState, type PropsWithChildren } from "react"
import { Context } from "./transport-context"
import type { TransportContextValue } from "./types"
import { createTransport, ShortPollingTransport, type ITransport } from "../transports"

export const TransportProvider = ({ children }: PropsWithChildren) => {
    const [currentTransport, setCurrentTransport] = useState<ITransport>(() => new ShortPollingTransport())

    const switchTransport = useCallback((type: TransportType) => {
        currentTransport.disconnect()
        const newTransport = createTransport(type)

        newTransport.connect()
        setCurrentTransport(newTransport)
    }, [currentTransport])

    const value: TransportContextValue = useMemo(() => ({
        transport: currentTransport,
        switchTransport,
    }), [currentTransport, switchTransport])

    return (
        <Context value={value}>
            {children}
        </Context>
    )
}