import { createContext, useContext, useState } from "react"

export const context = createContext()

export function useSession() {
  return useContext(context)
}

export function useLogin() {
  const { onLogin } = useSession()
  return onLogin
}

export function useLogout() {
  const { onLogout } = useSession()
  return onLogout
}

export function useUsuario() {
  const { usuario } = useSession()
  return usuario
}

function leerUsuarioGuardado() {
  try {
    return JSON.parse(localStorage.getItem("usuario"))
  } catch {
    return null
  }
}

export function SessionProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado)

  const onLogin = (sesion) => {
    const guardado = {
      token: sesion.token,
      id: sesion.id,
      nombre: sesion.nombre,
      correo: sesion.correo,
    }
    setUsuario(guardado)
    localStorage.setItem("usuario", JSON.stringify(guardado))
  }

  const onLogout = () => {
    localStorage.removeItem("usuario")
    setUsuario(null)
  }

  return (
    <context.Provider value={{ usuario, onLogin, onLogout }}>
      {children}
    </context.Provider>
  )
}
