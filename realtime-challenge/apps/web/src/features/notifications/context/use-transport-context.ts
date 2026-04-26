import { use } from "react";
import { Context } from "./transport-context";

export const useTransportContext = () => {
    const ctx = use(Context);

    if (!ctx) throw new Error('useTransportContext must be used within TransportProvider');
    
    return ctx;
}