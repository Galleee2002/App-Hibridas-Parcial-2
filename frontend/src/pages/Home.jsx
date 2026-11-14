import { Link } from "react-router"
import { FolderOpen, SquareTerminal, Terminal } from "lucide-react"
import { useUsuario } from "@/context/session.context.jsx"

export default function Home() {
  const usuario = useUsuario()

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="page-enter space-y-2">
        <h1 className="inline-flex items-center gap-2 font-heading text-2xl font-semibold tracking-tight">
          <SquareTerminal className="size-6 text-primary" aria-hidden="true" />
          CommandHub
        </h1>
        <p className="text-sm text-muted-foreground">
          Hola{usuario?.nombre ? `, ${usuario.nombre}` : ""}. Administrá tus
          comandos y categorías desde aquí.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/comandos"
          className="list-card page-enter flex flex-col gap-3"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Terminal className="size-4" aria-hidden="true" />
          </span>
          <span className="font-heading text-base font-semibold">
            Ir a mis comandos
          </span>
          <span className="text-sm text-muted-foreground">
            Buscá, filtrá y copiá tus comandos personales.
          </span>
        </Link>
        <Link
          to="/categorias"
          className="list-card page-enter page-enter-delay flex flex-col gap-3"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <FolderOpen className="size-4" aria-hidden="true" />
          </span>
          <span className="font-heading text-base font-semibold">
            Ir a categorías
          </span>
          <span className="text-sm text-muted-foreground">
            Organizá tus comandos en categorías personales.
          </span>
        </Link>
      </div>
    </section>
  )
}
