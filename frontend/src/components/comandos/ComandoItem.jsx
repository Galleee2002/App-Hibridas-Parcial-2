import { useState } from "react"
import { Link } from "react-router"
import { Check, Copy, Folder, Pencil, Terminal, Trash2 } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

export default function ComandoItem({
  comandos,
  nombresCategorias,
  hayFiltros = false,
  onLimpiarFiltros,
}) {
  const [copiadoId, setCopiadoId] = useState("")
  const [errorCopiaId, setErrorCopiaId] = useState("")

  if (comandos.length === 0) {
    if (hayFiltros) {
      return (
        <div className="list-card flex flex-col items-start gap-2 text-sm text-muted-foreground">
          <Terminal className="size-5 text-primary" aria-hidden="true" />
          <p>No hay comandos que coincidan con tu búsqueda o categoría.</p>
          {onLimpiarFiltros ? (
            <button
              type="button"
              onClick={onLimpiarFiltros}
              className="back-link"
            >
              Limpiar filtros
            </button>
          ) : null}
        </div>
      )
    }

    return (
      <div className="list-card flex flex-col items-start gap-2 text-sm text-muted-foreground">
        <Terminal className="size-5 text-primary" aria-hidden="true" />
        <p>
          Todavía no tenés comandos. Creá el primero para guardarlo en tu
          biblioteca.
        </p>
      </div>
    )
  }

  const handleCopiar = async (comando) => {
    setErrorCopiaId("")
    try {
      await navigator.clipboard.writeText(comando.instruccion)
      setCopiadoId(comando.id)
      setTimeout(() => {
        setCopiadoId((actual) => (actual === comando.id ? "" : actual))
      }, 1500)
    } catch {
      setCopiadoId("")
      setErrorCopiaId(comando.id)
    }
  }

  return (
    <>
      <p className="sr-only" aria-live="polite">
        {errorCopiaId
          ? "No se pudo copiar"
          : copiadoId
            ? "Instrucción copiada"
            : ""}
      </p>
      {comandos.map((comando) => {
        const copiado = copiadoId === comando.id
        return (
          <article key={comando.id} className="list-card flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <h2 className="text-sm font-medium">{comando.titulo}</h2>
                <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                  <Folder className="size-3" aria-hidden="true" />
                  {nombresCategorias[comando.categoriaId] || "—"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopiar(comando)}
                >
                  {copiado ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Copy aria-hidden="true" />
                  )}
                  {copiado ? "Copiado" : "Copiar"}
                </Button>
                <Link
                  to={`/comandos/${comando.id}/editar`}
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  <Pencil aria-hidden="true" />
                  Editar
                </Link>
                <Link
                  to={`/comandos/${comando.id}/eliminar`}
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
            </div>
            <pre className="snippet">{comando.instruccion}</pre>
            {comando.descripcion ? (
              <p className="text-sm text-muted-foreground">
                {comando.descripcion}
              </p>
            ) : null}
            {errorCopiaId === comando.id ? (
              <p className="text-sm text-destructive">No se pudo copiar</p>
            ) : null}
          </article>
        )
      })}
    </>
  )
}
