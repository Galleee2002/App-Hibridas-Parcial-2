import {
    crearComandoSchema,
    actualizarComandoSchema,
    consultarComandosSchema,
} from "../schemas/comandos.js"

function mensajesValidacion(error, mensajeFallback) {
    return error.issues?.map((issue) => {
        const campo = issue.path.length ? `${issue.path.join(".")}: ` : ""
        return `${campo}${issue.message}`
    }) ?? [mensajeFallback]
}

function crearValidador(schema) {
    return async function validarComando(req, res, next) {
        try {
            req.body = await schema.parseAsync(req.body)
            next()
        } catch (error) {
            res.status(400).json(mensajesValidacion(error, "Los datos del comando no son válidos"))
        }
    }
}

export const validarCrearComando = crearValidador(crearComandoSchema)
export const validarActualizarComando = crearValidador(actualizarComandoSchema)

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
    } catch (error) {
        res.status(400).json(mensajesValidacion(error, "Los parámetros de consulta no son válidos"))
    }
}
