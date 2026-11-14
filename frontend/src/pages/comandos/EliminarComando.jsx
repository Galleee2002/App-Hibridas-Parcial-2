import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApiCategorias } from "@/services/categorias.service.js"
import { useApiComandos } from "@/services/comandos.service.js"

export default function EliminarComando() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { obtener, eliminar } = useApiComandos()
  const { listar: listarCategorias } = useApiCategorias()
  const [comando, setComando] = useState(null)
  const [nombreCategoria, setNombreCategoria] = useState("")
  const [estado, setEstado] = useState("loading")
  const [errorCarga, setErrorCarga] = useState("")
  const [errorApi, setErrorApi] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let activo = true

    async function cargar() {
      setEstado("loading")
      setErrorCarga("")
      try {
        const [datos, datosCategorias] = await Promise.all([
          obtener(id),
          listarCategorias(),
        ])
        if (!activo) return

        const categoria = Array.isArray(datosCategorias)
          ? datosCategorias.find((item) => item.id === datos.categoriaId)
          : null

        setComando(datos)
        setNombreCategoria(categoria?.nombre || "—")
        setEstado("ready")
      } catch (error) {
        if (!activo) return
        setErrorCarga(error.message || "No se pudo cargar el comando")
        setEstado("error")
      }
    }

    cargar()
    return () => {
      activo = false
    }
  }, [id])

  const handleEliminar = async (evento) => {
    evento.preventDefault()
    setErrorApi("")
    setIsSubmitting(true)
    try {
      await eliminar(id)
      navigate("/comandos")
    } catch (error) {
      setErrorApi(error.message || "No se pudo eliminar el comando")
      setIsSubmitting(false)
    }
  }

  if (estado === "loading") {
    return (
      <p className="panel page-enter mx-auto w-full max-w-md px-4 py-3 text-sm text-muted-foreground">
        Cargando comando...
      </p>
    )
  }

  if (estado === "error") {
    return (
      <section className="page-enter mx-auto w-full max-w-md">
        <div className="panel space-y-4 p-6">
          <p className="text-sm text-destructive">{errorCarga}</p>
          <Link to="/comandos" className="back-link">
            Volver a comandos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-enter mx-auto w-full max-w-md">
      <div className="panel space-y-6 p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-md bg-destructive/15 text-destructive">
          <Trash2 className="size-5" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Eliminar comando
          </h1>
          <p className="text-sm text-muted-foreground">
            Confirmá que querés eliminar este comando. La categoría asociada no
            se elimina.
          </p>
        </div>
      </div>

      <div className="space-y-2 rounded-md border border-border bg-muted/40 px-4 py-3">
        <p className="text-sm font-medium">{comando.titulo}</p>
        <pre className="snippet">{comando.instruccion}</pre>
        <p className="text-sm text-muted-foreground">{comando.descripcion}</p>
        <p className="text-sm text-muted-foreground">
          Categoría: {nombreCategoria}
        </p>
      </div>

      {errorApi ? (
        <p className="whitespace-pre-line text-sm text-destructive">
          {errorApi}
        </p>
      ) : null}

      <form onSubmit={handleEliminar} className="flex flex-wrap gap-3">
        <Button type="submit" variant="destructive" disabled={isSubmitting}>
          <Trash2 aria-hidden="true" />
          {isSubmitting ? "Eliminando..." : "Eliminar"}
        </Button>
        <Link to="/comandos" className="cancel-link">
          Cancelar
        </Link>
      </form>
      </div>
    </section>
  )
}
