import {
    crearComandoSchema,
    actualizarComandoSchema,
    consultarComandosSchema,
} from "../schemas/comandos.js"

export async function validarCrearComando(req, res, next) {
    try {
        const comando = await crearComandoSchema.parseAsync(req.body)
        req.body = comando
        next()
    } catch (errors) {
        const messages = errors.issues.map((error) => `${error.path}: ${error.message}`)
        res.status(400).json(messages)
    }
}

export async function validarActualizarComando(req, res, next) {
    try {
        const comando = await actualizarComandoSchema.parseAsync(req.body)
        req.body = comando
        next()
    } catch (errors) {
        const messages = errors.issues.map((error) => `${error.path}: ${error.message}`)
        res.status(400).json(messages)
    }
}

export async function validarConsultarComandos(req, res, next) {
    try {
        const query = await consultarComandosSchema.parseAsync(req.query)
        Object.defineProperty(req, "query", {
            value: query,
            writable: true,
            enumerable: true,
            configurable: true,
        })
        next()
    } catch (errors) {
        const messages = errors.issues.map((error) => `${error.path}: ${error.message}`)
        res.status(400).json(messages)
    }
}
