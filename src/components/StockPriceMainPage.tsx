import { useStock } from "@/context/StockContext";
import { useGetStock } from "@/hooks/useStocks";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function StockPrice() {
  const [ticker, setTicker] = useState("")
  const { stockValue, timePeriodValue, frequencyValue } = useStock()
  const { data, isLoading, error } = useGetStock(ticker)

  useEffect(() => {
    if (stockValue !== "") {
      setTicker(stockValue)
    }
  }, [stockValue])

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={["dataMin", "dataMax"]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#4caf50" strokeWidth={2} dot={false} activeDot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
