import { useStock } from "@/context/StockContext"
import { useFutureStockSim } from "@/hooks/useStocks"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { format, parseISO } from 'date-fns'
import { LoadingSpinner } from "./loading"

export default function FutureStockPrice() {
    const [ticker, setTicker] = useState("")
    const { stockValue } = useStock()
    const {data, isLoading, error} = useFutureStockSim(ticker)

      useEffect(() => {
        if (stockValue !== "") {
          setTicker(stockValue)
        }
      }, [stockValue])
      if (isLoading || error || !data || data.length === 0) return <LoadingSpinner/>

      return (
    <div>
        <h1 className="text-white">Simulated Future Stock Price</h1>
        <div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" ticks={[data[0]?.date, data[data.length - 1]?.date]}
                  tickFormatter={(date) => format(parseISO(date), "yyyy")} tick={{ fontSize: 12 }}/>
                <YAxis domain={["dataMin", "dataMax"]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="predicted_price" stroke="#4caf50" strokeWidth={2} dot={false} activeDot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
      )
}