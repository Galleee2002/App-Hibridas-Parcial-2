import { Router } from "express"
import * as comandosController from "../controllers/comandos.controller.js"
import { validateToken } from "../../middlewares/auth.validate.js"
import {
    validarCrearComando,
    validarActualizarComando,
    validarConsultarComandos,
} from "../../middlewares/comandos.validate.js"

const router = Router()

router.get("/api/comandos", validateToken, validarConsultarComandos, comandosController.listarComandos)
router.get("/api/comandos/:id", validateToken, comandosController.obtenerComando)
router.post("/api/comandos", validateToken, validarCrearComando, comandosController.crearComando)
router.put("/api/comandos/:id", validateToken, validarActualizarComando, comandosController.actualizarComando)
router.delete("/api/comandos/:id", validateToken, comandosController.eliminarComando)

export default router
