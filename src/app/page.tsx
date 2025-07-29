"use client"
import { LoadingPage } from "@/components/ui/loading"
import { useUser } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()
    const token = localStorage.getItem("token")
    const { data, isLoading, error } = useUser(token)

    if (error || !data || data?.disabled === true) {
        router.push("/login")
    }
    if (isLoading) {
        <LoadingPage/>
    }

    return (
        <div>
            <h1>Welcome {data.username}</h1>
        </div>
    )
}