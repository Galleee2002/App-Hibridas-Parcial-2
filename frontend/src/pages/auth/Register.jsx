import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { registroSchema } from "@/schemas/usuarios.js"
import { useApiUsuarios } from "@/services/usuarios.service.js"

const campoClase =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

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
    <section className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Registro
        </h1>
        <p className="text-sm text-muted-foreground">
          Creá tu cuenta para guardar tus comandos.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1">
          <label htmlFor="nombre" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            className={campoClase}
            {...register("nombre")}
          />
          {errors.nombre ? (
            <p className="text-sm text-destructive">{errors.nombre.message}</p>
          ) : null}
        </div>

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
            autoComplete="new-password"
            className={campoClase}
            {...register("contraseña")}
          />
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
          <input
            id="confirmarContraseña"
            type="password"
            autoComplete="new-password"
            className={campoClase}
            {...register("confirmarContraseña")}
          />
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
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        ¿Ya tenés cuenta?{" "}
        <Link
          to="/ingreso"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Ingresá
        </Link>
      </p>
    </section>
  )
}
