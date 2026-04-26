import { TransportType } from "@repo/shared"
import type { ConnectionStatus } from "./transport.interface"
import { BaseTransport } from "./base-transport"

export class SseTransport extends BaseTransport {
    readonly type = TransportType.SSE

    status: ConnectionStatus = 'disconnected'

    connect(): void {

    }

    disconnect(): void {
        
    }
}