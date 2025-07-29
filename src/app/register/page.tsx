"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRegister } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function Register() {
  const [form, setForm] = useState({ email: "", username: "", full_name: "", password: "" })
  const registerMutation = useRegister()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = () => {
    registerMutation.mutate(form, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.access_token)
        router.push("/")
      },
      onError: (err) => {
        console.log(`Registration failed ${err}`)
      }
    })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-xl bg-black">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Register</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={form.username} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input id="full_name" value={form.full_name} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={form.password} onChange={handleChange} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleSubmit}>Register</Button>
          <Button variant="link" className="text-sm text-muted-foreground bg-black" onClick={() => router.push("/login")}>
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}