import { call } from "./api.service.js"

export function useApiUsuarios() {
  return {
    registrar(usuario) {
      return call("/api/usuarios", "POST", usuario)
    },
    login(credenciales) {
      return call("/api/login", "POST", credenciales)
    },
    obtenerCuenta() {
      return call("/api/usuarios/me")
    },
    actualizarCuenta(datos) {
      return call("/api/usuarios/me", "PUT", datos)
    },
  }
}
