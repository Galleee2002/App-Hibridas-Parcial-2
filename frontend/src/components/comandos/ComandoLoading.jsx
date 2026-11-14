export default function ComandoLoading() {
  return [1, 2, 3].map((numero) => (
    <div key={numero} className="list-card animate-pulse space-y-3">
      <div className="h-4 w-40 rounded bg-muted" />
      <div className="h-10 w-full rounded bg-muted" />
      <div className="h-4 w-56 rounded bg-muted" />
    </div>
  ))
}
