import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Terminal } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { comandoSchema } from "@/schemas/comandos.js"
import { useApiCategorias } from "@/services/categorias.service.js"
import { useApiComandos } from "@/services/comandos.service.js"

export default function NuevoComando() {
  const navigate = useNavigate()
  const { crear } = useApiComandos()
  const { listar: listarCategorias } = useApiCategorias()
  const [categorias, setCategorias] = useState([])
  const [estadoCategorias, setEstadoCategorias] = useState("loading")
  const [errorCategorias, setErrorCategorias] = useState("")
  const [errorApi, setErrorApi] = useState("")
  const {
    register,
    handleSubmit,
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

    async function cargarCategorias() {
      setEstadoCategorias("loading")
      setErrorCategorias("")
      try {
        const datos = await listarCategorias()
        if (!activo) return
        setCategorias(Array.isArray(datos) ? datos : [])
        setEstadoCategorias("ready")
      } catch (error) {
        if (!activo) return
        setErrorCategorias(
          error.message || "No se pudieron cargar las categorías.",
        )
        setEstadoCategorias("error")
      }
    }

    cargarCategorias()
    return () => {
      activo = false
    }
  }, [])

  const onSubmit = async (datos) => {
    setErrorApi("")
    try {
      await crear(datos)
      navigate("/comandos")
    } catch (error) {
      setErrorApi(error.message || "No se pudo crear el comando")
    }
  }

  return (
    <section className="page-enter mx-auto w-full max-w-md">
      <div className="panel space-y-6 p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <Terminal className="size-5" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Nuevo comando
          </h1>
          <p className="text-sm text-muted-foreground">
            Título, instrucción, descripción y categoría son obligatorios.
          </p>
        </div>
      </div>

      {estadoCategorias === "loading" ? (
        <p className="text-sm text-muted-foreground">Cargando categorías...</p>
      ) : null}

      {estadoCategorias === "error" ? (
        <p className="text-sm text-destructive">{errorCategorias}</p>
      ) : null}

      {estadoCategorias === "ready" && categorias.length === 0 ? (
        <div className="space-y-3 rounded-md border border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Necesitás al menos una categoría propia antes de crear un comando.
          </p>
          <Link to="/categorias/nueva" className={buttonVariants()}>
            Crear categoría
          </Link>
        </div>
      ) : null}

      {estadoCategorias === "ready" && categorias.length > 0 ? (
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
              <Plus aria-hidden="true" />
              {isSubmitting ? "Guardando..." : "Crear"}
            </Button>
            <Link to="/comandos" className="cancel-link">
              Cancelar
            </Link>
          </div>
        </form>
      ) : null}
      </div>
    </section>
  )
}
