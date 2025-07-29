"use client"
import { LoadingPage } from "@/components/ui/loading"
import TimePeriod from "@/components/ui/TimePeriod"
import { useUser } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
    const router = useRouter()
    const token = localStorage.getItem("token")
    const { data, isLoading, error } = useUser(token)

    useEffect(() => {
        if (error) {
            router.push("/login");
        }
    }, [error, router]);

    if (isLoading || !data) {
        <LoadingPage/>
    }

    return (
        <div className="dark:bg-gray-900">
            <h1 className="text-white">Welcome {data?.username}</h1>
            <TimePeriod/>
        </div>
    )
}