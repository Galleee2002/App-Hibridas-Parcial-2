import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { useApiCategorias } from "@/services/categorias.service.js"

export default function EliminarCategoria() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { obtener, eliminar } = useApiCategorias()
  const [categoria, setCategoria] = useState(null)
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
        const datos = await obtener(id)
        if (!activo) return
        setCategoria(datos)
        setEstado("ready")
      } catch (error) {
        if (!activo) return
        setErrorCarga(error.message || "No se pudo cargar la categoría")
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
      navigate("/categorias")
    } catch (error) {
      setErrorApi(
        error.message ||
          "No se puede eliminar la categoría porque tiene comandos asociados",
      )
      setIsSubmitting(false)
    }
  }

  if (estado === "loading") {
    return (
      <p className="text-sm text-muted-foreground">Cargando categoría...</p>
    )
  }

  if (estado === "error") {
    return (
      <section className="mx-auto w-full max-w-md space-y-4">
        <p className="text-sm text-destructive">{errorCarga}</p>
        <Link
          to="/categorias"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Volver a categorías
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Eliminar categoría
        </h1>
        <p className="text-sm text-muted-foreground">
          Confirmá que querés eliminar esta categoría. Si tiene comandos
          asociados, la API lo impedirá.
        </p>
      </div>

      <div className="space-y-1 rounded-md border border-border px-4 py-3">
        <p className="text-sm font-medium">{categoria.nombre}</p>
        <p className="text-sm text-muted-foreground">
          {categoria.descripcion || "Sin descripción"}
        </p>
      </div>

      {errorApi ? (
        <p className="whitespace-pre-line text-sm text-destructive">
          {errorApi}
        </p>
      ) : null}

      <form onSubmit={handleEliminar} className="flex flex-wrap gap-3">
        <Button type="submit" variant="destructive" disabled={isSubmitting}>
          {isSubmitting ? "Eliminando..." : "Eliminar"}
        </Button>
        <Link
          to="/categorias"
          className="inline-flex h-8 items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Cancelar
        </Link>
      </form>
    </section>
  )
}
