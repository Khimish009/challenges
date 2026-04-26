import type { TransportType } from "@repo/shared";
import type { ConnectionStatus, ITransport, TransportEvents } from "./transport.interface";

export abstract class BaseTransport implements ITransport {
    abstract readonly type: TransportType;

    abstract readonly status: ConnectionStatus;

    private listeners: { [K in keyof TransportEvents]?: Set<TransportEvents[K]> } = {}

    on<K extends keyof TransportEvents>(event: K, handler: TransportEvents[K]): void {
        this.listeners[event] ??= new Set()
        this.listeners[event]!.add(handler)
    }

    off<K extends keyof TransportEvents>(event: K, handler: TransportEvents[K]): void {
        this.listeners[event]?.delete(handler)
    }

    protected emit<K extends keyof TransportEvents>(event: K, ...args: Parameters<TransportEvents[K]>): void {
        this.listeners[event]?.forEach(listener => listener(...args as [never]))
    }

    abstract connect(): void;
    abstract disconnect(): void;
}