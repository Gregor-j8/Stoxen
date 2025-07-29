"use client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { useLogin } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" })
  const loginMutation = useLogin()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = () => {
    loginMutation.mutate(form, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.access_token)
        router.push("/")
      },
      onError: (err) => {
        console.log(`Login failed ${err}`)
      }
    })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-xl bg-black">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={form.username} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={form.password} onChange={handleChange} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleSubmit}>Sign In</Button>
          <Link href="/register" className="text-sm text-muted-foreground bg-black text-center">Register</Link>
          <Button variant="link" className="text-sm text-muted-foreground bg-black">
            Forgot password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}