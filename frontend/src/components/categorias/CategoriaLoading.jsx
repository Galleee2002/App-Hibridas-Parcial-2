export default function CategoriaLoading() {
  return [1, 2, 3].map((numero) => (
    <div key={numero} className="list-card animate-pulse space-y-3">
      <div className="h-4 w-36 rounded bg-muted" />
      <div className="h-4 w-56 rounded bg-muted" />
    </div>
  ))
}
