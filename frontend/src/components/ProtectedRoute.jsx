import { Navigate } from "react-router"
import { useUsuario } from "@/context/session.context.jsx"

export default function ProtectedRoute({ element }) {
  const usuario = useUsuario()

  if (usuario?.token) {
    return element
  }

  return <Navigate to="/ingreso" replace />
}
