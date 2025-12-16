import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type CourseCardProps = {
  title: string
  description: string
  price: number
}

export default function CourseCard({
  title,
  description,
  price,
}: CourseCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="space-y-2">
        <h3 className="text-lg font-semibold leading-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardHeader>

      <CardContent>
        <p className="text-xl font-bold">
          ${price}
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full">
          Ver curso
        </Button>
      </CardFooter>
    </Card>
  )
}
