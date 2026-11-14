import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categoriaSchema } from "@/schemas/categorias.js"
import { useApiCategorias } from "@/services/categorias.service.js"

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
      <p className="panel page-enter mx-auto w-full max-w-md px-4 py-3 text-sm text-muted-foreground">
        Cargando categoría...
      </p>
    )
  }

  if (estado === "error") {
    return (
      <section className="page-enter mx-auto w-full max-w-md">
        <div className="panel space-y-4 p-6">
          <p className="text-sm text-destructive">{errorCarga}</p>
          <Link to="/categorias" className="back-link">
            Volver a categorías
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-enter mx-auto w-full max-w-md">
      <div className="panel space-y-6 p-6">
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
            className="field"
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
            className="field"
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
            <Save aria-hidden="true" />
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
          <Link to="/categorias" className="cancel-link">
            Cancelar
          </Link>
        </div>
      </form>
      </div>
    </section>
  )
}
