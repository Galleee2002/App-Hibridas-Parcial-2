import {
    usuariosLoginSchema,
    usuariosRegistroSchema,
    usuariosActualizarSchema,
} from "../schemas/usuarios.js"

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

export async function validateActualizar(req, res, next) {
    try {
        const datos = await usuariosActualizarSchema.parseAsync(req.body)
        req.body = datos
        next()
    } catch (errors) {
        const messages = errors.issues.map((error) => `${error.path}: ${error.message}`)
        res.status(400).json(messages)
    }
}
