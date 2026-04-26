import { TransportType } from "@repo/shared"
import { useTransportContext } from "../context"

export const TransportSwitcher = () => {
    const { switchTransport } = useTransportContext()

    const TRANSPORT_OPTIONS = [
        { type: TransportType.SHORT_POLLING, label: 'Short Polling' },
        { type: TransportType.LONG_POLLING, label: 'Long Polling' },
        { type: TransportType.SSE, label: 'SSE' },
        { type: TransportType.WEBSOCKET, label: 'WS' }
    ]
    return (
        <div>
            {TRANSPORT_OPTIONS.map(({ type, label }) => (
                <button key={type} onClick={() => switchTransport(type)}>
                    {label}
                </button>
            ))}
        </div>
    )
}