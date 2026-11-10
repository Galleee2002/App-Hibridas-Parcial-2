import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { categoriaSchema } from "@/schemas/categorias.js"
import { useApiCategorias } from "@/services/categorias.service.js"

const campoClase =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

export default function EditarCategoria() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { obtener, actualizar } = useApiCategorias()
  const [estado, setEstado] = useState("loading")
  const [errorCarga, setErrorCarga] = useState("")
  const [errorApi, setErrorApi] = useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  })

  useEffect(() => {
    let activo = true

    async function cargar() {
      setEstado("loading")
      setErrorCarga("")
      try {
        const categoria = await obtener(id)
        if (!activo) return
        reset({
          nombre: categoria.nombre ?? "",
          descripcion: categoria.descripcion ?? "",
        })
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

  const onSubmit = async (datos) => {
    setErrorApi("")
    try {
      await actualizar(id, datos)
      navigate("/categorias")
    } catch (error) {
      setErrorApi(error.message || "No se pudo actualizar la categoría")
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
          Editar categoría
        </h1>
        <p className="text-sm text-muted-foreground">
          Cambiá el nombre o la descripción.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1">
          <label htmlFor="nombre" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            className={campoClase}
            {...register("nombre")}
          />
          {errors.nombre ? (
            <p className="text-sm text-destructive">{errors.nombre.message}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label htmlFor="descripcion" className="block text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="descripcion"
            rows={3}
            className={campoClase}
            {...register("descripcion")}
          />
          {errors.descripcion ? (
            <p className="text-sm text-destructive">
              {errors.descripcion.message}
            </p>
          ) : null}
        </div>

        {errorApi ? (
          <p className="whitespace-pre-line text-sm text-destructive">
            {errorApi}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
          <Link
            to="/categorias"
            className="inline-flex h-8 items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  )
}
