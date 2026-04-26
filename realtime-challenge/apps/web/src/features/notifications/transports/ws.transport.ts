import { TransportType } from "@repo/shared"
import type { ConnectionStatus, ITransport, TransportEvents } from "./transport.interface"

export class WsTransport implements ITransport {
    readonly type = TransportType.WEBSOCKET

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