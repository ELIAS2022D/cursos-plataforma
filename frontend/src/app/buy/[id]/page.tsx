"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { createPayment } from "@/services/payments"

export default function BuyPage() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string

  useEffect(() => {
    const token = localStorage.getItem("token")

    // 🔐 Si no está logueado → login
    if (!token) {
      localStorage.setItem("redirectAfterLogin", `/buy/${courseId}`)
      router.replace("/login")
      return
    }

    async function startPayment() {
      try {
        const data = await createPayment(courseId)

        if (data.init_point) {
          window.location.href = data.init_point
        } else {
          alert("Error iniciando el pago")
        }
      } catch (err) {
        console.error(err)
        alert("Error iniciando el pago")
      }
    }

    startPayment()
  }, [courseId, router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirigiendo a Mercado Pago…</p>
    </div>
  )
}
