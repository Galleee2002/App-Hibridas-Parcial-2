if (!process.env.MONGODB_URI || !process.env.MONGODB_DB || !process.env.JWT_SECRET) {
    console.error("Faltan MONGODB_URI, MONGODB_DB o JWT_SECRET. Copiá .env.example a .env y completá los valores.")
    process.exit(1)
}

const { default: express } = await import("express")
const { default: estadoApiRoutes } = await import("./api/routes/estado.routes.js")
const { default: usuariosApiRoutes } = await import("./api/routes/usuarios.routes.js")
const { default: categoriasApiRoutes } = await import("./api/routes/categorias.routes.js")
const { cors } = await import("./middlewares/cors.js")

const app = express()

app.use(cors)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(estadoApiRoutes)
app.use(usuariosApiRoutes)
app.use(categoriasApiRoutes)

app.listen(2026, () => console.log("Funcionando...."))
