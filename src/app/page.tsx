import { LoadingPage } from "@/components/ui/loading";
import { useUser } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter()
    const token = localStorage.getItem("token")
    const { data, isLoading, error } = useUser(token)

    if (error) {
        router.push("/login")
    }
    if (isLoading) {
        <LoadingPage/>
    }
    return (
        <div>
        
        </div>
    )
}