import { Link } from "react-router"

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col gap-3">
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Página no encontrada
      </h1>
      <p className="text-sm text-muted-foreground">
        La ruta solicitada no existe.
      </p>
      <Link
        to="/"
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
