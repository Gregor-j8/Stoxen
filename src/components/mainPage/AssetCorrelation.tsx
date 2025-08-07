import { useStockAssetCorrelation } from "@/hooks/useStocks"
import { useEffect, useState } from "react"
import { LoadingSpinner } from "../loading"

export default function AssetCorrelation() {
  const { data, isLoading, error } = useStockAssetCorrelation()
  const [tickers, setTickers] = useState<string[]>([])
  const [correlationData, setCorrelationData] = useState<Record<string, Record<string, number>>>({})

  useEffect(() => {
    if (data) {
      setCorrelationData(data)
      setTickers(Object.keys(data))
    }
  }, [data])
  console.log(data)
  if (isLoading || error || !data || Object.keys(data).length === 0) {
    return <LoadingSpinner />
  }

  return (
    <div className="overflow-x-auto p-4 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Asset Correlation</h2>
      <table className="min-w-full border border-gray-600">
        <thead>
          <tr>
            <th className="border border-gray-600 px-4 py-2 bg-gray-800 text-white">Ticker</th>
            {tickers.map(col => (
              <th key={col} className="border border-gray-600 px-4 py-2 bg-gray-800 text-white">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tickers.map(row => (
            <tr key={row} className="hover:bg-gray-800">
              <th className="border border-gray-600 px-4 py-2 bg-gray-800 text-white text-left">
                {row}
              </th>
              {tickers.map((col) => (
                <td key={col} className="border border-gray-600 px-4 py-2 text-center bg-gray-700 text-white rounded">
                  {correlationData[row][col].toFixed(3)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}