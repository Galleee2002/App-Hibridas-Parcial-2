if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    console.error("Faltan MONGODB_URI o MONGODB_DB. Copiá .env.example a .env y completá los valores.")
    process.exit(1)
}

const { default: express } = await import("express")
const { default: estadoApiRoutes } = await import("./api/routes/estado.routes.js")
const { cors } = await import("./middlewares/cors.js")

const app = express()

app.use(cors)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(estadoApiRoutes)

app.listen(2026, () => console.log("Funcionando...."))
