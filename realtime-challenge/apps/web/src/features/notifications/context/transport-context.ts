import { createContext } from "react"
import type { TransportContextValue } from "./types"

export const Context = createContext<TransportContextValue | null>(null)