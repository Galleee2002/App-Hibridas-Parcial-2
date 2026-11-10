import * as usuariosService from "../../services/usuarios.services.js"

export async function registrarUsuario(req, res) {
    try {
        const usuario = await usuariosService.registrarUsuario(req.body)
        res.status(201).json(usuario)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function loginUsuario(req, res) {
    try {
        const sesion = await usuariosService.loginUsuario(req.body)
        res.status(200).json(sesion)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function obtenerUsuarioActual(req, res) {
    try {
        const usuario = await usuariosService.obtenerUsuarioPorId(req.usuario.id)
        res.status(200).json(usuario)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function actualizarUsuarioActual(req, res) {
    try {
        const usuario = await usuariosService.actualizarUsuario(req.usuario.id, req.body)
        res.status(200).json(usuario)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}
