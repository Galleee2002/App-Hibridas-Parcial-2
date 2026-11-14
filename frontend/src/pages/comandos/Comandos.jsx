import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Plus, Search } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import ComandoError from "@/components/comandos/ComandoError.jsx"
import ComandoItem from "@/components/comandos/ComandoItem.jsx"
import ComandoLoading from "@/components/comandos/ComandoLoading.jsx"
import { useApiCategorias } from "@/services/categorias.service.js"
import { useApiComandos } from "@/services/comandos.service.js"

export default function Comandos() {
  const { listar } = useApiComandos()
  const { listar: listarCategorias } = useApiCategorias()
  const [comandos, setComandos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [nombresCategorias, setNombresCategorias] = useState({})
  const [tituloInput, setTituloInput] = useState("")
  const [titulo, setTitulo] = useState("")
  const [categoriaId, setCategoriaId] = useState("")
  const [estado, setEstado] = useState("loading")
  const [errorMensaje, setErrorMensaje] = useState("")
  const [errorCategorias, setErrorCategorias] = useState("")

  const hayFiltros = Boolean(titulo.trim() || categoriaId)

  useEffect(() => {
    let activo = true

    async function cargarCategorias() {
      try {
        const datosCategorias = await listarCategorias()
        if (!activo) return

        const lista = Array.isArray(datosCategorias) ? datosCategorias : []
        const mapa = {}
        for (const categoria of lista) {
          mapa[categoria.id] = categoria.nombre
        }

        setCategorias(lista)
        setNombresCategorias(mapa)
        setErrorCategorias("")
      } catch (error) {
        if (!activo) return
        setErrorCategorias(
          error.message || "No se pudieron cargar las categorías.",
        )
      }
    }

    cargarCategorias()
    return () => {
      activo = false
    }
  }, [])

  useEffect(() => {
    let activo = true

    async function cargarComandos() {
      setEstado("loading")
      setErrorMensaje("")
      try {
        const datosComandos = await listar({ titulo, categoriaId })
        if (!activo) return
        setComandos(Array.isArray(datosComandos) ? datosComandos : [])
        setEstado("ready")
      } catch (error) {
        if (!activo) return
        setErrorMensaje(error.message || "No se pudieron cargar los comandos.")
        setEstado("error")
      }
    }

    cargarComandos()
    return () => {
      activo = false
    }
  }, [titulo, categoriaId])

  const handleBuscar = (evento) => {
    evento.preventDefault()
    setTitulo(tituloInput.trim())
  }

  const handleLimpiar = () => {
    setTituloInput("")
    setTitulo("")
    setCategoriaId("")
  }

  let contenido
  switch (estado) {
    case "loading":
      contenido = <ComandoLoading />
      break
    case "ready":
      contenido = (
        <ComandoItem
          comandos={comandos}
          nombresCategorias={nombresCategorias}
          hayFiltros={hayFiltros}
          onLimpiarFiltros={handleLimpiar}
        />
      )
      break
    default:
      contenido = <ComandoError mensaje={errorMensaje} />
      break
  }

  return (
    <section className="page-enter mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Mis comandos
          </h1>
          <p className="text-sm text-muted-foreground">
            Buscá, filtrá y copiá tus comandos personales.
          </p>
        </div>
        <Link to="/comandos/nuevo" className={buttonVariants()}>
          <Plus aria-hidden="true" />
          Nuevo comando
        </Link>
      </div>

      <form
        onSubmit={handleBuscar}
        className="panel flex flex-wrap items-end gap-3 p-4"
      >
        <div className="min-w-[12rem] flex-1 space-y-1">
          <label htmlFor="filtro-titulo" className="block text-sm font-medium">
            Título
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="filtro-titulo"
              type="text"
              value={tituloInput}
              onChange={(evento) => setTituloInput(evento.target.value)}
              className="field field-icon"
              placeholder="Buscar por título"
            />
          </div>
        </div>

        <div className="min-w-[12rem] flex-1 space-y-1">
          <label
            htmlFor="filtro-categoria"
            className="block text-sm font-medium"
          >
            Categoría
          </label>
          <select
            id="filtro-categoria"
            value={categoriaId}
            onChange={(evento) => setCategoriaId(evento.target.value)}
            className="field"
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          {errorCategorias ? (
            <p className="text-sm text-destructive">{errorCategorias}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit">
            <Search aria-hidden="true" />
            Buscar
          </Button>
          {hayFiltros ? (
            <Button type="button" variant="outline" onClick={handleLimpiar}>
              Limpiar filtros
            </Button>
          ) : null}
        </div>
      </form>

      <div className="flex flex-col gap-3">{contenido}</div>
    </section>
  )
}
