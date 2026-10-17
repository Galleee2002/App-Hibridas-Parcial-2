import { Router } from "express"
import * as estadoController from "../controllers/estado.controller.js"

const router = Router()

router.get("/api/estado", estadoController.getEstado)

export default router
