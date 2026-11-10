import { Router } from "express"
import * as usuariosController from "../controllers/usuarios.controller.js"
import {
    validateLogin,
    validateRegistro,
    validateActualizar,
} from "../../middlewares/usuarios.validate.js"
import { validateToken } from "../../middlewares/auth.validate.js"

const router = Router()

router.post("/api/usuarios", validateRegistro, usuariosController.registrarUsuario)
router.post("/api/login", validateLogin, usuariosController.loginUsuario)
router.get("/api/usuarios/me", validateToken, usuariosController.obtenerUsuarioActual)
router.put("/api/usuarios/me", validateToken, validateActualizar, usuariosController.actualizarUsuarioActual)

export default router
