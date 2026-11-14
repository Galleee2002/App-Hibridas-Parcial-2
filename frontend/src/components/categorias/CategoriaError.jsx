import { CircleAlert } from "lucide-react"

export default function CategoriaError({ mensaje }) {
  return (
    <div className="list-card flex items-start gap-2 text-sm text-destructive">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <p>{mensaje || "No se pudieron cargar las categorías."}</p>
    </div>
  )
}
