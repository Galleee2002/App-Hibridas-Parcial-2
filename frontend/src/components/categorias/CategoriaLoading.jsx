export default function CategoriaLoading() {
  return [1, 2, 3].map((numero) => (
    <tr key={numero} className="animate-pulse border-b border-border">
      <td className="px-3 py-3">
        <div className="h-4 w-28 rounded bg-muted" />
      </td>
      <td className="px-3 py-3">
        <div className="h-4 w-40 rounded bg-muted" />
      </td>
      <td className="px-3 py-3">
        <div className="h-4 w-24 rounded bg-muted" />
      </td>
    </tr>
  ))
}
