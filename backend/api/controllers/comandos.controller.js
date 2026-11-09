import * as comandosService from "../../services/comandos.services.js"

export async function listarComandos(req, res) {
    try {
        const comandos = await comandosService.listarComandos(req.usuario.id)
        res.status(200).json(comandos)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function obtenerComando(req, res) {
    try {
        const comando = await comandosService.obtenerComandoPorId(req.params.id, req.usuario.id)
        res.status(200).json(comando)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function crearComando(req, res) {
    try {
        const comando = await comandosService.crearComando(req.body, req.usuario.id)
        res.status(201).json(comando)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function actualizarComando(req, res) {
    try {
        const comando = await comandosService.actualizarComando(req.params.id, req.body, req.usuario.id)
        res.status(200).json(comando)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function eliminarComando(req, res) {
    try {
        const resultado = await comandosService.eliminarComando(req.params.id, req.usuario.id)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}
