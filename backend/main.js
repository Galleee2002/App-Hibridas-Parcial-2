import express from "express"
import estadoApiRoutes from "./api/routes/estado.routes.js"
import usuariosApiRoutes from "./api/routes/usuarios.routes.js"
import categoriasApiRoutes from "./api/routes/categorias.routes.js"
import comandosApiRoutes from "./api/routes/comandos.routes.js"
import { cors } from "./middlewares/cors.js"

if (!process.env.MONGODB_URI || !process.env.MONGODB_DB || !process.env.JWT_SECRET) {
    console.error("Faltan MONGODB_URI, MONGODB_DB o JWT_SECRET. Copiá .env.example a .env y completá los valores.")
    process.exit(1)
}

const app = express()

app.use(cors)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(estadoApiRoutes)
app.use(usuariosApiRoutes)
app.use(categoriasApiRoutes)
app.use(comandosApiRoutes)

app.listen(2026, () => console.log("Funcionando...."))
