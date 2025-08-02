"use client"
import { LoadingPage } from "@/components/loading"
import StockPrice from "@/components/StockPriceMainPage"
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
        console.log("token", token)   
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
        <div className="dark:bg-gray-900">
            <h1 className="text-white">Welcome {data?.username}</h1>
            <TimePeriod/>
            <StockPrice/>
        </div>
    )
}