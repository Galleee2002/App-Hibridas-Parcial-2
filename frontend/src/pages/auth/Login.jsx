import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useLogin } from "@/context/session.context.jsx"
import { loginSchema } from "@/schemas/usuarios.js"
import { useApiUsuarios } from "@/services/usuarios.service.js"

const campoClase =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

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
    <section className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Ingreso
        </h1>
        <p className="text-sm text-muted-foreground">
          Accedé a tu biblioteca personal de comandos.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1">
          <label htmlFor="correo" className="block text-sm font-medium">
            Correo
          </label>
          <input
            id="correo"
            type="email"
            autoComplete="email"
            className={campoClase}
            {...register("correo")}
          />
          {errors.correo ? (
            <p className="text-sm text-destructive">{errors.correo.message}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label htmlFor="contraseña" className="block text-sm font-medium">
            Contraseña
          </label>
          <input
            id="contraseña"
            type="password"
            autoComplete="current-password"
            className={campoClase}
            {...register("contraseña")}
          />
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
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        ¿No tenés cuenta?{" "}
        <Link
          to="/registro"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Registrate
        </Link>
      </p>
    </section>
  )
}
