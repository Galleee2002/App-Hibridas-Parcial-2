import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import CategoriaError from "@/components/categorias/CategoriaError.jsx"
import CategoriaItem from "@/components/categorias/CategoriaItem.jsx"
import CategoriaLoading from "@/components/categorias/CategoriaLoading.jsx"
import { useApiCategorias } from "@/services/categorias.service.js"

export default function Categorias() {
  const { listar } = useApiCategorias()
  const [categorias, setCategorias] = useState([])
  const [estado, setEstado] = useState("loading")
  const [errorMensaje, setErrorMensaje] = useState("")

  useEffect(() => {
    let activo = true

    async function cargar() {
      setEstado("loading")
      setErrorMensaje("")
      try {
        const datos = await listar()
        if (!activo) return
        setCategorias(Array.isArray(datos) ? datos : [])
        setEstado("ready")
      } catch (error) {
        if (!activo) return
        setErrorMensaje(error.message || "No se pudieron cargar las categorías.")
        setEstado("error")
      }
    }

    cargar()
    return () => {
      activo = false
    }
  }, [])

  let contenido
  switch (estado) {
    case "loading":
      contenido = <CategoriaLoading />
      break
    case "ready":
      contenido = <CategoriaItem categorias={categorias} />
      break
    default:
      contenido = <CategoriaError mensaje={errorMensaje} />
      break
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Categorías
          </h1>
          <p className="text-sm text-muted-foreground">
            Organizá tus comandos en categorías personales.
          </p>
        </div>
        <Link to="/categorias/nueva">
          <Button type="button">Nueva categoría</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full min-w-[28rem] text-left">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-3 py-2 text-sm font-medium">Nombre</th>
              <th className="px-3 py-2 text-sm font-medium">Descripción</th>
              <th className="px-3 py-2 text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>{contenido}</tbody>
        </table>
      </div>
    </section>
  )
}
