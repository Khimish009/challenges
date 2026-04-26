import { TransportType } from "@repo/shared"
import type { ITransport } from "./transport.interface"
import { ShortPollingTransport } from "./short-polling.transport"
import { LongPollingTransport } from "./long-polling.transport"
import { SseTransport } from "./sse.transport"
import { WsTransport } from "./ws.transport"

export const createTransport = (type: TransportType): ITransport => {
        switch(type) {
            case TransportType.SHORT_POLLING:
                return new ShortPollingTransport()
            case TransportType.LONG_POLLING:
                return new LongPollingTransport()
            case TransportType.SSE:
                return new SseTransport()
            case TransportType.WEBSOCKET:
                return new WsTransport()
        }
    }