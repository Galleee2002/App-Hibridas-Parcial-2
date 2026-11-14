import { Link } from "react-router"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <section className="page-enter mx-auto w-full max-w-md">
      <div className="panel flex flex-col items-start gap-3 p-6">
        <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <FileQuestion className="size-5" aria-hidden="true" />
        </span>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Página no encontrada
        </h1>
        <p className="text-sm text-muted-foreground">
          La ruta solicitada no existe.
        </p>
        <Link to="/" className="back-link">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
