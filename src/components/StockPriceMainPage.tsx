import { useStock } from "@/context/StockContext";
import { useGetStock } from "@/hooks/useStocks";
import { useEffect, useState } from "react";

export default function StockPrice() {
    const [ticker, setTicker] = useState('')
    const { stockValue, timePeriodValue, frequencyValue } = useStock()
    const { data, isLoading, error } = useGetStock(ticker)

    console.log(data)

    
    useEffect(() => {
        if (stockValue !== '') {
            setTicker(stockValue)
        }
    }, [stockValue])
    return (
        <div>
            hi
        </div>
    )
}