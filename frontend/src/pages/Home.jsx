import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { useUsuario } from "@/context/session.context.jsx"

export default function Home() {
  const usuario = useUsuario()

  return (
    <section className="mx-auto flex max-w-xl flex-col gap-4 animate-in fade-in duration-300 motion-reduce:animate-none">
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Área privada
      </h1>
      <p className="text-sm text-muted-foreground">
        Hola{usuario?.nombre ? `, ${usuario.nombre}` : ""}. Administrá tus
        categorías desde aquí. Los comandos llegan en la próxima etapa.
      </p>
      <div>
        <Link to="/categorias">
          <Button type="button">Ir a categorías</Button>
        </Link>
      </div>
    </section>
  )
}
