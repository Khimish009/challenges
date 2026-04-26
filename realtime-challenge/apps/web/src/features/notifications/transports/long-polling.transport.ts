import { TransportType, type LongPollingResponseDto } from "@repo/shared"
import type { ConnectionStatus } from "./transport.interface"
import { BaseTransport } from "./base-transport"

export class LongPollingTransport extends BaseTransport {
    readonly type = TransportType.LONG_POLLING

    status: ConnectionStatus = 'disconnected'

    private cursor: string | null = null

    private controller = new AbortController()

    private async fetchNotifications() {
        const api = this.cursor 
            ? `/api/notifications/poll/long?cursor=${this.cursor}` 
            : '/api/notifications/poll/long'

        const resp = await fetch(api, {
            method: 'GET',
            signal: this.controller.signal
        })

        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status}`)
        }

        const { notifications, cursor }: LongPollingResponseDto = await resp.json() 

        this.cursor = cursor

        return notifications
    }

    private async startPolling() {
        try {
            const notifications = await this.fetchNotifications()

            this.status = "connected"

            notifications.forEach(notification => this.emit('notification', notification))

            void this.startPolling()
        } catch(e) {
            if (e instanceof Error && e.name === 'AbortError') {
                this.status = 'disconnected'
                return
            }

            this.emit('error', e instanceof Error ? e : new Error(String(e)))
            void this.startPolling()
        }
    }

    connect(): void {
        this.controller = new AbortController()
        this.status = "connecting"

        void this.startPolling()
    }

    disconnect(): void {
        this.controller.abort()
    }
}