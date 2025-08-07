"use client"
import { LoadingPage } from "@/components/loading"
import AssetCorrelation from "@/components/mainPage/AssetCorrelation"
import FutureStockPrice from "@/components/mainPage/FutureStockPrice"
import News from "@/components/mainPage/News"
import StockPrice from "@/components/mainPage/StockPrice"
import TimePeriod from "@/components/TimePeriod"
import { useUser } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
    const [token, setToken] = useState('')
    const router = useRouter()
    const { data, isLoading, error } = useUser(token)

    useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
        setToken(token)
    }}, [])

    useEffect(() => {
        if (error) {
            router.push("/login")
        }
    }, [error, router])

    if (isLoading || !data) {
        <LoadingPage/>
    }

    return (
        <div className="dark:bg-gray-900 flex flex-col">
            <h1 className="text-white">Welcome {data?.username}</h1>
            <TimePeriod/>
            <div className="flex justify-between w-full p-10">
                <div className="z-1000 w-1/2 h-52">
                    <StockPrice />
                </div>
                <div className="w-1/2 h-52">
                    <FutureStockPrice />
                </div>
            </div>
            <div className="flex justify-between w-full p-10">
                <div className="z-1000 w-1/2 h-96">
                    <AssetCorrelation />
                </div>
            </div>
            <div className="flex justify-between w-full p-10">
                <div className="z-1000 w-1/2 h-96">
                    <News />
                </div>
            </div>
        </div>
    )
}