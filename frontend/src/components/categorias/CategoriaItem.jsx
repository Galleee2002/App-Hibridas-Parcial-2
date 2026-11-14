import { Link } from "react-router"
import { Folder, Pencil, Trash2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function CategoriaItem({ categorias }) {
  if (categorias.length === 0) {
    return (
      <div className="list-card flex flex-col items-start gap-2 text-sm text-muted-foreground">
        <Folder className="size-5 text-primary" aria-hidden="true" />
        <p>
          Todavía no tenés categorías. Creá la primera para organizar tus
          comandos.
        </p>
      </div>
    )
  }

  return categorias.map((categoria) => (
    <article key={categoria.id} className="list-card flex flex-wrap items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <Folder className="size-4" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h2 className="text-sm font-medium">{categoria.nombre}</h2>
          <p className="text-sm text-muted-foreground">
            {categoria.descripcion || "—"}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          to={`/categorias/${categoria.id}/editar`}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <Pencil aria-hidden="true" />
          Editar
        </Link>
        <Link
          to={`/categorias/${categoria.id}/eliminar`}
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "text-destructive",
          })}
        >
          <Trash2 aria-hidden="true" />
          Eliminar
        </Link>
      </div>
    </article>
  ))
}
