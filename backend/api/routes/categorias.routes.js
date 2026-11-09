import { Router } from "express"
import * as categoriasController from "../controllers/categorias.controller.js"
import { validateActualizar, validateCrear } from "../../middlewares/categorias.validate.js"
import { validateToken } from "../../middlewares/auth.validate.js"

const router = Router()

router.get("/api/categorias", validateToken, categoriasController.listarCategorias)
router.get("/api/categorias/:id", validateToken, categoriasController.obtenerCategoria)
router.post("/api/categorias", validateToken, validateCrear, categoriasController.crearCategoria)
router.put(
    "/api/categorias/:id",
    validateToken,
    validateActualizar,
    categoriasController.actualizarCategoria
)
router.delete("/api/categorias/:id", validateToken, categoriasController.eliminarCategoria)

export default router
