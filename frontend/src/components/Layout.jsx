import { Link, Outlet } from "react-router"
import { useUsuario } from "@/context/session.context.jsx"

export default function Layout() {
  const usuario = useUsuario()

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        <Link
          to={usuario?.token ? "/" : "/ingreso"}
          className="font-heading text-lg font-semibold tracking-tight"
        >
          CommandHub
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {usuario?.token ? (
            <>
              <Link
                to="/"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Inicio
              </Link>
              <Link
                to="/categorias"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Categorías
              </Link>
              <Link
                to="/salir"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Salir
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/ingreso"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Ingreso
              </Link>
              <Link
                to="/registro"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Registro
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
