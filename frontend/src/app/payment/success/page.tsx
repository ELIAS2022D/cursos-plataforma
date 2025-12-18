"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard")
      router.refresh()
    }, 1500)
  }, [])

  return (
    <div className="flex h-[60vh] items-center justify-center">
      <h1 className="text-2xl font-semibold">
        ✅ Pago aprobado, redirigiendo...
      </h1>
    </div>
  )
}