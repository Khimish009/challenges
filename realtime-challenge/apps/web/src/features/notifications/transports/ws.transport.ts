import { TransportType } from "@repo/shared"
import type { ConnectionStatus } from "./transport.interface"
import { BaseTransport } from "./base-transport"

export class WsTransport extends BaseTransport {
    readonly type = TransportType.WEBSOCKET

    status: ConnectionStatus = 'disconnected'

    connect(): void {

    }

    disconnect(): void {
        
    }
}