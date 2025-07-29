'use client'
import { createContext, useContext, useState, ReactNode } from "react"

type StockSettings = {
  stockValue: string
  timePeriodValue: string
  frequencyValue: string
  setStockValue: (stock: string) => void
  setTimePeriodValue: (period: string) => void
  setFrequencyValue: (freq: string) => void
}

const StockContext = createContext<StockSettings | undefined>(undefined)

export const StockProvider = ({children}: {children: ReactNode}) => {
    const [stockValue, setStockValue] = useState("")
    const [timePeriodValue, setTimePeriodValue] = useState("")
    const [frequencyValue, setFrequencyValue] = useState("")

    return (
        <StockContext.Provider value={{ stockValue, timePeriodValue, frequencyValue, setStockValue, setTimePeriodValue, setFrequencyValue }}>
            {children}
        </StockContext.Provider>
    )
}

export const useStock = () => {
  const context = useContext(StockContext)
  if (!context) {
    throw new Error("useStock must be used within a StockProvider")
  }
  return context
}