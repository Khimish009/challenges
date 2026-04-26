import { TransportType } from "@repo/shared"
import type { ConnectionStatus, ITransport, TransportEvents } from "./transport.interface"

export class SseTransport implements ITransport {
    readonly type = TransportType.SSE

    readonly status: ConnectionStatus = 'disconnected'

    connect(): void {

    }

    disconnect(): void {
        
    }

    on<K extends keyof TransportEvents>(event: K, handler: TransportEvents[K]): void {
        
    }

    off<K extends keyof TransportEvents>(event: K, handler: TransportEvents[K]): void {
        
    }
}