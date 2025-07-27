import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function Register() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <div>
                <Card className="w-full max-w-sm shadow-xl bg-black">
                <CardHeader>
                <CardTitle className="text-2xl text-center">Register</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter your username" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="full name" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">Register</Button>
                <Button variant="link" className="text-sm text-muted-foreground bg-black">
                    Back to Login
                </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
    )
}