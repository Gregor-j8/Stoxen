import { useStock } from "@/context/StockContext";
import { timePeriod, frequency } from "@/lib/constants"

export default function StockControls(){
    const { stockValue, timePeriodValue, frequencyValue, setStockValue, setTimePeriodValue, setFrequencyValue } = useStock()
    
  return (
    <div className="flex items-end gap-6 p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
        <div className="flex flex-col gap-1 w-48">
            <label htmlFor="stock" className="text-sm font-medium text-white">Stock</label>
            <input id="stock" type="text" placeholder="AAPL" value={stockValue} onChange={(e) => {setStockValue(e.target.value)}}
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white placeholder:text-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div className="flex flex-col gap-1 w-48">
            <label htmlFor="timePeriod" className="text-sm font-medium text-white">Time Period</label>
            <select id="timePeriod" value={timePeriodValue} onChange={(e) => {setTimePeriodValue(e.target.value)}}
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option disabled>Select time period</option>
            {timePeriod?.map((time) => (
                <option key={time} value={time}>{time}</option>
            ))}
            </select>
        </div>

        <div className="flex flex-col gap-1 w-48">
            <label htmlFor="frequency" className="text-sm font-medium text-white">Frequency</label>
            <select id="frequency" value={frequencyValue} onChange={(e) => {setFrequencyValue(e.target.value)}}
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option disabled>Select frequency</option>
            {frequency?.map(freq => (
                <option key={freq} value={freq}>{freq}</option>
            ))}
            </select>
        </div>
    </div>
  )
}