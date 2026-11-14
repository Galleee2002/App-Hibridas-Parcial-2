import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Save, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLogin, useUsuario } from "@/context/session.context.jsx"
import { actualizarCuentaSchema } from "@/schemas/usuarios.js"
import { useApiUsuarios } from "@/services/usuarios.service.js"

export default function MiCuenta() {
  const usuario = useUsuario()
  const onLogin = useLogin()
  const { obtenerCuenta, actualizarCuenta } = useApiUsuarios()
  const [estado, setEstado] = useState("loading")
  const [errorCarga, setErrorCarga] = useState("")
  const [errorApi, setErrorApi] = useState("")
  const [correo, setCorreo] = useState("")
  const [mensaje, setMensaje] = useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(actualizarCuentaSchema),
    defaultValues: {
      nombre: "",
    },
  })

  useEffect(() => {
    let activo = true

    async function cargar() {
      setEstado("loading")
      setErrorCarga("")
      try {
        const cuenta = await obtenerCuenta()
        if (!activo) return
        setCorreo(cuenta.correo ?? "")
        reset({ nombre: cuenta.nombre ?? "" })
        setEstado("ready")
      } catch (error) {
        if (!activo) return
        setErrorCarga(error.message || "No se pudo cargar la cuenta")
        setEstado("error")
      }
    }

    cargar()
    return () => {
      activo = false
    }
  }, [])

  const onSubmit = async (datos) => {
    setErrorApi("")
    setMensaje("")
    try {
      const cuenta = await actualizarCuenta({ nombre: datos.nombre })
      setCorreo(cuenta.correo ?? correo)
      reset({ nombre: cuenta.nombre ?? datos.nombre })
      onLogin({
        token: usuario.token,
        id: cuenta.id,
        nombre: cuenta.nombre,
        correo: cuenta.correo,
      })
      setMensaje("Nombre actualizado.")
    } catch (error) {
      setErrorApi(error.message || "No se pudo actualizar el nombre")
    }
  }

  if (estado === "loading") {
    return (
      <p className="panel page-enter mx-auto w-full max-w-md px-4 py-3 text-sm text-muted-foreground">
        Cargando cuenta...
      </p>
    )
  }

  if (estado === "error") {
    return (
      <section className="page-enter mx-auto w-full max-w-md">
        <div className="panel space-y-4 p-6">
          <p className="text-sm text-destructive">{errorCarga}</p>
          <Link to="/" className="back-link">
            Volver al inicio
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-enter mx-auto w-full max-w-md">
      <div className="panel space-y-6 p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <User className="size-5" aria-hidden="true" />
          </span>
          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Mi cuenta
            </h1>
            <p className="text-sm text-muted-foreground">
              Consultá tu correo y actualizá el nombre visible.
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
                {...register("nombre", {
                  onChange: () => setMensaje(""),
                })}
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
                value={correo}
                disabled
                className="field field-icon"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              El correo no se puede cambiar.
            </p>
          </div>

          {errorApi ? (
            <p className="whitespace-pre-line text-sm text-destructive">
              {errorApi}
            </p>
          ) : null}

          {mensaje ? (
            <p className="text-sm text-muted-foreground">{mensaje}</p>
          ) : null}

          <Button type="submit" disabled={isSubmitting}>
            <Save aria-hidden="true" />
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </form>
      </div>
    </section>
  )
}
