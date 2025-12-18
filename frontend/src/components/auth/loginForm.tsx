"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/services/auth"
import { setAuthToken } from "@/services/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await login({ email, password })
    const { access_token, user } = res.data

    setAuthToken(access_token)
    localStorage.setItem("token", access_token)
    localStorage.setItem("user", JSON.stringify(user))

    router.refresh()        // 🔄 refresca Navbar + layout
    router.push("/dashboard") // 🚀 redirige
    window.location.href = "/dashboard"
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div>
        <Label>Email</Label>
        <Input value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <Button className="w-full">Ingresar</Button>
    </form>
  )
}