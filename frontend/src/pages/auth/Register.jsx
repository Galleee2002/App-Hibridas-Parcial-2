import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail, User, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { registroSchema } from "@/schemas/usuarios.js"
import { useApiUsuarios } from "@/services/usuarios.service.js"

export default function Register() {
  const navigate = useNavigate()
  const { registrar } = useApiUsuarios()
  const [errorApi, setErrorApi] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registroSchema),
  })

  const onSubmit = async (datos) => {
    setErrorApi("")
    try {
      await registrar({
        nombre: datos.nombre,
        correo: datos.correo,
        contraseña: datos.contraseña,
      })
      navigate("/ingreso")
    } catch (error) {
      setErrorApi(error.message || "No se pudo crear la cuenta")
    }
  }

  return (
    <section className="page-enter mx-auto w-full max-w-md">
      <div className="panel space-y-6 p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <UserPlus className="size-5" aria-hidden="true" />
          </span>
          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Registro
            </h1>
            <p className="text-sm text-muted-foreground">
              Creá tu cuenta para guardar tus comandos.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1">
            <label htmlFor="nombre" className="block text-sm font-medium">
              Nombre
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="nombre"
                type="text"
                autoComplete="name"
                className="field field-icon"
                {...register("nombre")}
              />
            </div>
            {errors.nombre ? (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            ) : null}
          </div>

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
                autoComplete="new-password"
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

          <div className="space-y-1">
            <label
              htmlFor="confirmarContraseña"
              className="block text-sm font-medium"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="confirmarContraseña"
                type="password"
                autoComplete="new-password"
                className="field field-icon"
                {...register("confirmarContraseña")}
              />
            </div>
            {errors.confirmarContraseña ? (
              <p className="text-sm text-destructive">
                {errors.confirmarContraseña.message}
              </p>
            ) : null}
          </div>

          {errorApi ? (
            <p className="whitespace-pre-line text-sm text-destructive">
              {errorApi}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <UserPlus aria-hidden="true" />
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          ¿Ya tenés cuenta?{" "}
          <Link to="/ingreso" className="back-link h-auto">
            Ingresá
          </Link>
        </p>
      </div>
    </section>
  )
}
