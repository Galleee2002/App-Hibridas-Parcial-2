import { crearComandoSchema, actualizarComandoSchema } from "../schemas/comandos.js"

function crearValidador(schema) {
    return async function validarComando(req, res, next) {
        try {
            req.body = await schema.parseAsync(req.body)
            next()
        } catch (error) {
            const mensajes = error.issues?.map((issue) => {
                const campo = issue.path.length ? `${issue.path.join(".")}: ` : ""
                return `${campo}${issue.message}`
            }) ?? ["Los datos del comando no son válidos"]

            res.status(400).json(mensajes)
        }
    }
}

export const validarCrearComando = crearValidador(crearComandoSchema)
export const validarActualizarComando = crearValidador(actualizarComandoSchema)
