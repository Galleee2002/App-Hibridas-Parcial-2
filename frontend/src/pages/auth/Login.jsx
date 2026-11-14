import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, LogIn, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLogin } from "@/context/session.context.jsx"
import { loginSchema } from "@/schemas/usuarios.js"
import { useApiUsuarios } from "@/services/usuarios.service.js"

export default function Login() {
  const navigate = useNavigate()
  const onLogin = useLogin()
  const { login } = useApiUsuarios()
  const [errorApi, setErrorApi] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (datos) => {
    setErrorApi("")
    try {
      const sesion = await login(datos)
      onLogin({
        token: sesion.token,
        id: sesion.usuario.id,
        nombre: sesion.usuario.nombre,
        correo: sesion.usuario.correo,
      })
      navigate("/")
    } catch (error) {
      setErrorApi(error.message || "No se pudo iniciar sesión")
    }
  }

  return (
    <section className="page-enter mx-auto w-full max-w-md">
      <div className="panel space-y-6 p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <LogIn className="size-5" aria-hidden="true" />
          </span>
          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Ingreso
            </h1>
            <p className="text-sm text-muted-foreground">
              Accedé a tu biblioteca personal de comandos.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1">
            <label htmlFor="correo" className="block text-sm font-medium">
              Correo
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="correo"
                type="email"
                autoComplete="email"
                className="field field-icon"
                {...register("correo")}
              />
            </div>
            {errors.correo ? (
              <p className="text-sm text-destructive">{errors.correo.message}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <label htmlFor="contraseña" className="block text-sm font-medium">
              Contraseña
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="contraseña"
                type="password"
                autoComplete="current-password"
                className="field field-icon"
                {...register("contraseña")}
              />
            </div>
            {errors.contraseña ? (
              <p className="text-sm text-destructive">
                {errors.contraseña.message}
              </p>
            ) : null}
          </div>

          {errorApi ? (
            <p className="whitespace-pre-line text-sm text-destructive">
              {errorApi}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <LogIn aria-hidden="true" />
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          ¿No tenés cuenta?{" "}
          <Link to="/registro" className="back-link h-auto">
            Registrate
          </Link>
        </p>
      </div>
    </section>
  )
}
