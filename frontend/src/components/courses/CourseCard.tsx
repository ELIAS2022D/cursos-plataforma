"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { purchaseCourse } from "@/services/payments"

interface Props {
  id: string
  title: string
  description: string
  price: number
  purchased?: boolean
}

export default function CourseCard({
  id,
  title,
  description,
  price,
  purchased = false,
}: Props) {
  const router = useRouter()

  async function handleBuy() {
    const token = localStorage.getItem("token")

    // 🔐 NO LOGUEADO → LOGIN
    if (!token) {
      localStorage.setItem("redirectAfterLogin", `/buy/${id}`)
      router.push("/login")
      return
    }

    try {
      const data = await purchaseCourse(id)

      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        throw new Error("init_point no recibido")
      }
    } catch (err) {
      console.error("Error al comprar", err)
      alert("Error al iniciar el pago")
    }
  }

  return (
    <div className="rounded-lg border p-6 space-y-4 bg-background">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-xl font-bold">${price}</p>

      {purchased ? (
        <Button
          className="w-full"
          onClick={() => router.push(`/courses/${id}`)}
        >
          Ver curso
        </Button>
      ) : (
        <Button className="w-full" onClick={handleBuy}>
          Comprar
        </Button>
      )}
    </div>
  )
}