import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categoriaSchema } from "@/schemas/categorias.js"
import { useApiCategorias } from "@/services/categorias.service.js"

export default function NuevaCategoria() {
  const navigate = useNavigate()
  const { crear } = useApiCategorias()
  const [errorApi, setErrorApi] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  })

  const onSubmit = async (datos) => {
    setErrorApi("")
    try {
      await crear(datos)
      navigate("/categorias")
    } catch (error) {
      setErrorApi(error.message || "No se pudo crear la categoría")
    }
  }

  return (
    <section className="page-enter mx-auto w-full max-w-md">
      <div className="panel space-y-6 p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <FolderPlus className="size-5" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Nueva categoría
          </h1>
          <p className="text-sm text-muted-foreground">
            El nombre es obligatorio. La descripción es opcional.
          </p>
        </div>
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
            <FolderPlus aria-hidden="true" />
            {isSubmitting ? "Guardando..." : "Crear"}
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
