import * as estadoService from "../../services/estado.services.js"

export async function getEstado(req, res) {
    try {
        const estado = await estadoService.getEstado()
        res.status(200).json(estado)
    } catch (error) {
        res.status(500).json({ message: error.message || error })
    }
}
