import { TransportType, type ShortPollingResponseDto } from "@repo/shared"
import type { ConnectionStatus } from "./transport.interface"
import { BaseTransport } from "./base-transport"

export class ShortPollingTransport extends BaseTransport {
    readonly type = TransportType.SHORT_POLLING

    status: ConnectionStatus = 'disconnected'

    private intervalId: ReturnType<typeof setInterval> | null = null

    private cursor: string | null = null

    private async fetchNotifications() {
        const api = this.cursor ? `/api/notifications/poll?cursor=${this.cursor}` : "/api/notifications/poll"
        
        const resp = await fetch(api, {
            method: 'GET'
        })

        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status}`)
        }

        const { notifications, cursor }: ShortPollingResponseDto = await resp.json()

        this.cursor = cursor

        return notifications
    }

    private async schedule() {
        try {
            const notifications = await this.fetchNotifications()

            this.status = "connected"

            notifications.forEach(notification => this.emit('notification', notification))

            this.intervalId = setInterval(async () => {
                try {
                    const notifications = await this.fetchNotifications()
                    notifications.forEach(n => this.emit('notification', n))
                } catch (e) {
                    this.emit('error', e instanceof Error ? e : new Error(String(e)))
                }
            }, 5000)
        } catch (e) {
            this.status = "error"
            this.emit("error", e instanceof Error ? e : new Error(String(e)))
        }
    }

    connect(): void {
        this.status = "connecting"

        void this.schedule()
    }

    disconnect(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }

        this.cursor = null
        this.status = "disconnected"
    }
}