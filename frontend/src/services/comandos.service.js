import { call } from "./api.service.js"

export function useApiComandos() {
  return {
    listar({ titulo, categoriaId } = {}) {
      const params = new URLSearchParams()
      if (titulo?.trim()) {
        params.set("titulo", titulo.trim())
      }
      if (categoriaId) {
        params.set("categoriaId", categoriaId)
      }
      const query = params.toString()
      return call(query ? "/api/comandos?" + query : "/api/comandos")
    },
    obtener(id) {
      return call("/api/comandos/" + id)
    },
    crear(comando) {
      return call("/api/comandos", "POST", comando)
    },
    actualizar(id, comando) {
      return call("/api/comandos/" + id, "PUT", comando)
    },
    eliminar(id) {
      return call("/api/comandos/" + id, "DELETE")
    },
  }
}
