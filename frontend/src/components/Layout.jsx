import { NavLink, Link, Outlet } from "react-router"
import {
  Folders,
  House,
  LogIn,
  LogOut,
  SquareTerminal,
  Terminal,
  User,
  UserPlus,
} from "lucide-react"
import { useUsuario } from "@/context/session.context.jsx"

export default function Layout() {
  const usuario = useUsuario()

  return (
    <div className="min-h-dvh text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-3">
          <Link
            to={usuario?.token ? "/" : "/ingreso"}
            className="inline-flex items-center gap-2 font-heading text-lg font-semibold tracking-tight"
          >
            <SquareTerminal className="size-5 text-primary" aria-hidden="true" />
            CommandHub
          </Link>
          <nav className="flex flex-wrap items-center gap-1">
            {usuario?.token ? (
              <>
                <NavLink to="/" end className="nav-link">
                  <House className="size-4" aria-hidden="true" />
                  Inicio
                </NavLink>
                <NavLink to="/categorias" className="nav-link">
                  <Folders className="size-4" aria-hidden="true" />
                  Categorías
                </NavLink>
                <NavLink to="/comandos" className="nav-link">
                  <Terminal className="size-4" aria-hidden="true" />
                  Mis comandos
                </NavLink>
                <NavLink to="/cuenta" className="nav-link">
                  <User className="size-4" aria-hidden="true" />
                  Mi cuenta
                </NavLink>
                <NavLink to="/salir" className="nav-link">
                  <LogOut className="size-4" aria-hidden="true" />
                  Salir
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/ingreso" className="nav-link">
                  <LogIn className="size-4" aria-hidden="true" />
                  Ingreso
                </NavLink>
                <NavLink to="/registro" className="nav-link">
                  <UserPlus className="size-4" aria-hidden="true" />
                  Registro
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
