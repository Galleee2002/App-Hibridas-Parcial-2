import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { comandoSchema } from "@/schemas/comandos.js"
import { useApiCategorias } from "@/services/categorias.service.js"
import { useApiComandos } from "@/services/comandos.service.js"

export default function EditarComando() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { obtener, actualizar } = useApiComandos()
  const { listar: listarCategorias } = useApiCategorias()
  const [categorias, setCategorias] = useState([])
  const [estado, setEstado] = useState("loading")
  const [errorCarga, setErrorCarga] = useState("")
  const [errorApi, setErrorApi] = useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(comandoSchema),
    defaultValues: {
      titulo: "",
      instruccion: "",
      descripcion: "",
      categoriaId: "",
    },
  })

  useEffect(() => {
    let activo = true

    async function cargar() {
      setEstado("loading")
      setErrorCarga("")
      try {
        const [comando, datosCategorias] = await Promise.all([
          obtener(id),
          listarCategorias(),
        ])
        if (!activo) return

        const lista = Array.isArray(datosCategorias) ? datosCategorias : []
        setCategorias(lista)
        reset({
          titulo: comando.titulo ?? "",
          instruccion: comando.instruccion ?? "",
          descripcion: comando.descripcion ?? "",
          categoriaId: comando.categoriaId ?? "",
        })
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

  const onSubmit = async (datos) => {
    setErrorApi("")
    try {
      await actualizar(id, datos)
      navigate("/comandos")
    } catch (error) {
      setErrorApi(error.message || "No se pudo actualizar el comando")
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

  if (categorias.length === 0) {
    return (
      <section className="page-enter mx-auto w-full max-w-md">
        <div className="panel space-y-4 p-6">
          <p className="text-sm text-muted-foreground">
            Necesitás al menos una categoría propia para editar un comando.
          </p>
          <Link to="/categorias/nueva" className={buttonVariants()}>
            Crear categoría
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
          Editar comando
        </h1>
        <p className="text-sm text-muted-foreground">
          Actualizá los datos del comando y su categoría.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1">
          <label htmlFor="titulo" className="block text-sm font-medium">
            Título
          </label>
          <input
            id="titulo"
            type="text"
            className="field"
            {...register("titulo")}
          />
          {errors.titulo ? (
            <p className="text-sm text-destructive">{errors.titulo.message}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label htmlFor="instruccion" className="block text-sm font-medium">
            Instrucción
          </label>
          <textarea
            id="instruccion"
            rows={3}
            className="field font-mono"
            {...register("instruccion")}
          />
          {errors.instruccion ? (
            <p className="text-sm text-destructive">
              {errors.instruccion.message}
            </p>
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

        <div className="space-y-1">
          <label htmlFor="categoriaId" className="block text-sm font-medium">
            Categoría
          </label>
          <select
            id="categoriaId"
            className="field"
            {...register("categoriaId")}
          >
            <option value="">Elegí una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          {errors.categoriaId ? (
            <p className="text-sm text-destructive">
              {errors.categoriaId.message}
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
          <Link to="/comandos" className="cancel-link">
            Cancelar
          </Link>
        </div>
      </form>
      </div>
    </section>
  )
}
