import * as categoriasService from "../../services/categorias.services.js"

export async function listarCategorias(req, res) {
    try {
        const categorias = await categoriasService.listarCategorias(req.usuario.id)
        res.status(200).json(categorias)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function obtenerCategoria(req, res) {
    try {
        const categoria = await categoriasService.obtenerCategoriaPorId(
            req.params.id,
            req.usuario.id
        )
        res.status(200).json(categoria)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function crearCategoria(req, res) {
    try {
        const categoria = await categoriasService.crearCategoria(req.body, req.usuario.id)
        res.status(201).json(categoria)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function actualizarCategoria(req, res) {
    try {
        const categoria = await categoriasService.actualizarCategoria(
            req.params.id,
            req.body,
            req.usuario.id
        )
        res.status(200).json(categoria)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}

export async function eliminarCategoria(req, res) {
    try {
        const resultado = await categoriasService.eliminarCategoria(
            req.params.id,
            req.usuario.id
        )
        res.status(200).json(resultado)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || error })
    }
}
