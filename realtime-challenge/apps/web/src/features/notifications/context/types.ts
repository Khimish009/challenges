import type { TransportType } from "@repo/shared";
import type { ITransport } from "../transports";

export interface TransportContextValue {
    transport: ITransport,
    switchTransport: (type: TransportType) => void
}