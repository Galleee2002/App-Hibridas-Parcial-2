import { call } from "./api.service.js"

export function useApiCategorias() {
  return {
    listar() {
      return call("/api/categorias")
    },
    obtener(id) {
      return call("/api/categorias/" + id)
    },
    crear(categoria) {
      return call("/api/categorias", "POST", categoria)
    },
    actualizar(id, categoria) {
      return call("/api/categorias/" + id, "PUT", categoria)
    },
    eliminar(id) {
      return call("/api/categorias/" + id, "DELETE")
    },
  }
}
