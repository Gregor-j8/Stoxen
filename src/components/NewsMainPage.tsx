import { useGetNews } from "@/hooks/useNews"
import { LoadingSpinner } from "./loading"

export default function News() {
    const {data, isLoading, error} = useGetNews()

    if (isLoading || error || !data || data.length === 0) return <LoadingSpinner/>
    return (
    <div className="max-h-[400px] overflow-y-auto scrollbar-hidden p-4 bg-gray-900 text-white rounded-xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold mb-6">Market News</h2>
        {data.articles.map(news => (
            <a key={news.id} href={news.link} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition">
                <p className="text-lg font-semibold text-white">{news.title}</p>
                <p className="text-sm text-gray-400 mt-1">{news.published}</p>
            </a>
        ))}
    </div>
    )
}