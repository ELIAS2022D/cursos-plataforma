import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface Props {
  title: string
  progress: number
}

export default function CourseProgressCard({ title, progress }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h3 className="font-semibold">
        {title}
      </h3>

      <Progress value={progress} />

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Progreso: {progress}%
        </span>

        <Button size="sm">
          Continuar
        </Button>
      </div>
    </div>
  )
}
