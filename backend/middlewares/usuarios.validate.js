import { usuariosLoginSchema, usuariosRegistroSchema } from "../schemas/usuarios.js"

export async function validateRegistro(req, res, next) {
    try {
        const usuario = await usuariosRegistroSchema.parseAsync(req.body)
        req.body = usuario
        next()
    } catch (errors) {
        const messages = errors.issues.map((error) => `${error.path}: ${error.message}`)
        res.status(400).json(messages)
    }
}

export async function validateLogin(req, res, next) {
    try {
        const credenciales = await usuariosLoginSchema.parseAsync(req.body)
        req.body = credenciales
        next()
    } catch (errors) {
        const messages = errors.issues.map((error) => `${error.path}: ${error.message}`)
        res.status(400).json(messages)
    }
}
