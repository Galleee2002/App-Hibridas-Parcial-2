import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI)
const db = client.db(process.env.MONGODB_DB)
const coleccion = db.collection("categorias")
const coleccionComandos = db.collection("comandos")

let indiceNombreListo = false

async function asegurarIndiceNombrePorUsuario() {
    if (indiceNombreListo) return
    await coleccion.createIndex({ usuarioId: 1, nombre: 1 }, { unique: true })
    indiceNombreListo = true
}

function mapearCategoria(documento) {
    const categoria = {
        id: documento._id.toString(),
        nombre: documento.nombre,
    }

    if (documento.descripcion !== undefined) {
        categoria.descripcion = documento.descripcion
    }

    return categoria
}

function crearError(mensaje, status) {
    const error = new Error(mensaje)
    error.status = status
    return error
}

function obtenerObjectIds(id, usuarioId) {
    if (!ObjectId.isValid(id) || !ObjectId.isValid(usuarioId)) {
        throw crearError("Categoría no encontrada", 404)
    }

    return {
        categoriaObjectId: new ObjectId(id),
        usuarioObjectId: new ObjectId(usuarioId),
    }
}

export async function listarCategorias(usuarioId) {
    if (!ObjectId.isValid(usuarioId)) {
        throw crearError("Categoría no encontrada", 404)
    }

    const documentos = await coleccion
        .find({ usuarioId: new ObjectId(usuarioId) })
        .toArray()

    return documentos.map(mapearCategoria)
}

export async function obtenerCategoriaPorId(id, usuarioId) {
    const { categoriaObjectId, usuarioObjectId } = obtenerObjectIds(id, usuarioId)

    const documento = await coleccion.findOne({
        _id: categoriaObjectId,
        usuarioId: usuarioObjectId,
    })

    if (!documento) {
        throw crearError("Categoría no encontrada", 404)
    }

    return mapearCategoria(documento)
}

export async function crearCategoria(datos, usuarioId) {
    await asegurarIndiceNombrePorUsuario()

    if (!ObjectId.isValid(usuarioId)) {
        throw crearError("Categoría no encontrada", 404)
    }

    const usuarioObjectId = new ObjectId(usuarioId)
    const existente = await coleccion.findOne({
        usuarioId: usuarioObjectId,
        nombre: datos.nombre,
    })

    if (existente) {
        throw crearError("Ya existe una categoría con ese nombre", 409)
    }

    const documento = {
        usuarioId: usuarioObjectId,
        nombre: datos.nombre,
    }

    if (datos.descripcion !== undefined) {
        documento.descripcion = datos.descripcion
    }

    try {
        const resultado = await coleccion.insertOne(documento)
        return mapearCategoria({
            _id: resultado.insertedId,
            nombre: documento.nombre,
            descripcion: documento.descripcion,
        })
    } catch (error) {
        if (error?.code === 11000) {
            throw crearError("Ya existe una categoría con ese nombre", 409)
        }
        throw error
    }
}

export async function actualizarCategoria(id, datos, usuarioId) {
    await asegurarIndiceNombrePorUsuario()

    const { categoriaObjectId, usuarioObjectId } = obtenerObjectIds(id, usuarioId)

    const actual = await coleccion.findOne({
        _id: categoriaObjectId,
        usuarioId: usuarioObjectId,
    })

    if (!actual) {
        throw crearError("Categoría no encontrada", 404)
    }

    const duplicado = await coleccion.findOne({
        usuarioId: usuarioObjectId,
        nombre: datos.nombre,
        _id: { $ne: categoriaObjectId },
    })

    if (duplicado) {
        throw crearError("Ya existe una categoría con ese nombre", 409)
    }

    try {
        if (datos.descripcion !== undefined) {
            await coleccion.updateOne(
                { _id: categoriaObjectId, usuarioId: usuarioObjectId },
                { $set: { nombre: datos.nombre, descripcion: datos.descripcion } }
            )
        } else {
            await coleccion.updateOne(
                { _id: categoriaObjectId, usuarioId: usuarioObjectId },
                {
                    $set: { nombre: datos.nombre },
                    $unset: { descripcion: "" },
                }
            )
        }

        return mapearCategoria({
            _id: categoriaObjectId,
            nombre: datos.nombre,
            descripcion: datos.descripcion,
        })
    } catch (error) {
        if (error?.code === 11000) {
            throw crearError("Ya existe una categoría con ese nombre", 409)
        }
        throw error
    }
}

export async function eliminarCategoria(id, usuarioId) {
    const { categoriaObjectId, usuarioObjectId } = obtenerObjectIds(id, usuarioId)

    const actual = await coleccion.findOne({
        _id: categoriaObjectId,
        usuarioId: usuarioObjectId,
    })

    if (!actual) {
        throw crearError("Categoría no encontrada", 404)
    }

    const comandosAsociados = await coleccionComandos.countDocuments({
        categoriaId: categoriaObjectId,
        usuarioId: usuarioObjectId,
    })

    if (comandosAsociados > 0) {
        throw crearError(
            "No se puede eliminar la categoría porque tiene comandos asociados",
            409
        )
    }

    await coleccion.deleteOne({
        _id: categoriaObjectId,
        usuarioId: usuarioObjectId,
    })

    return { message: "Categoría eliminada" }
}
