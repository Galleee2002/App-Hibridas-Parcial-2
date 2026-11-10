import { Navigate } from "react-router"
import { useLogout } from "@/context/session.context.jsx"

export default function Logout() {
  const logout = useLogout()
  logout()
  return <Navigate to="/ingreso" replace />
}
