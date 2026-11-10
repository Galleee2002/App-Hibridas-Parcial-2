import { Link } from "react-router"

export default function CategoriaItem({ categorias }) {
  if (categorias.length === 0) {
    return (
      <tr>
        <td
          colSpan={3}
          className="px-3 py-6 text-sm text-muted-foreground"
        >
          Todavía no tenés categorías. Creá la primera para organizar tus
          comandos.
        </td>
      </tr>
    )
  }

  return categorias.map((categoria) => (
    <tr key={categoria.id} className="border-b border-border">
      <td className="px-3 py-3 text-sm font-medium">{categoria.nombre}</td>
      <td className="px-3 py-3 text-sm text-muted-foreground">
        {categoria.descripcion || "—"}
      </td>
      <td className="px-3 py-3 text-sm">
        <div className="flex flex-wrap gap-3">
          <Link
            to={`/categorias/${categoria.id}/editar`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Editar
          </Link>
          <Link
            to={`/categorias/${categoria.id}/eliminar`}
            className="font-medium text-destructive underline-offset-4 hover:underline"
          >
            Eliminar
          </Link>
        </div>
      </td>
    </tr>
  ))
}
