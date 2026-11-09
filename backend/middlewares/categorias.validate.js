import { categoriasActualizarSchema, categoriasCrearSchema } from "../schemas/categorias.js"

export async function validateCrear(req, res, next) {
    try {
        const categoria = await categoriasCrearSchema.parseAsync(req.body)
        req.body = categoria
        next()
    } catch (errors) {
        const messages = errors.issues.map((error) => `${error.path}: ${error.message}`)
        res.status(400).json(messages)
    }
}

export async function validateActualizar(req, res, next) {
    try {
        const categoria = await categoriasActualizarSchema.parseAsync(req.body)
        req.body = categoria
        next()
    } catch (errors) {
        const messages = errors.issues.map((error) => `${error.path}: ${error.message}`)
        res.status(400).json(messages)
    }
}
