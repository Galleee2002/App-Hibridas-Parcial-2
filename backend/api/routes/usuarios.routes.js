import { Router } from "express"
import * as usuariosController from "../controllers/usuarios.controller.js"
import { validateLogin, validateRegistro } from "../../middlewares/usuarios.validate.js"
import { validateToken } from "../../middlewares/auth.validate.js"

const router = Router()

router.post("/api/usuarios", validateRegistro, usuariosController.registrarUsuario)
router.post("/api/login", validateLogin, usuariosController.loginUsuario)
router.get("/api/usuarios/me", validateToken, usuariosController.obtenerUsuarioActual)

export default router
