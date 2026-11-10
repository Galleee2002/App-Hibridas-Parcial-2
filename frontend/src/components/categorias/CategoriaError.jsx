export default function CategoriaError({ mensaje }) {
  return (
    <tr>
      <td colSpan={3} className="px-3 py-6 text-sm text-destructive">
        {mensaje || "No se pudieron cargar las categorías."}
      </td>
    </tr>
  )
}
