import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI)
const db = client.db(process.env.MONGODB_DB)

function crearError(mensaje, status) {
    const error = new Error(mensaje)
    error.status = status
    return error
}

function convertirId(id) {
    if (!ObjectId.isValid(id)) {
        throw crearError("Comando no encontrado", 404)
    }
    return new ObjectId(id)
}

function convertirIdUsuario(usuarioId) {
    if (!ObjectId.isValid(usuarioId)) {
        throw crearError("Usuario no válido", 401)
    }
    return new ObjectId(usuarioId)
}

function convertirComando(documento) {
    return {
        id: documento._id.toString(),
        titulo: documento.titulo,
        instruccion: documento.instruccion,
        descripcion: documento.descripcion,
        categoriaId: documento.categoriaId.toString(),
    }
}

async function validarCategoria(categoriaId, usuarioId) {
    const categoriaObjectId = convertirId(categoriaId)
    const categoria = await db.collection("categorias").findOne({
        _id: categoriaObjectId,
        usuarioId,
    })

    if (!categoria) {
        throw crearError("Categoría no encontrada", 404)
    }

    return categoriaObjectId
}

export async function listarComandos(usuarioId) {
    const usuarioObjectId = convertirIdUsuario(usuarioId)
    const documentos = await db.collection("comandos")
        .find({ usuarioId: usuarioObjectId })
        .toArray()

    return documentos.map(convertirComando)
}

export async function obtenerComandoPorId(id, usuarioId) {
    const comandoId = convertirId(id)
    const usuarioObjectId = convertirIdUsuario(usuarioId)
    const documento = await db.collection("comandos").findOne({
        _id: comandoId,
        usuarioId: usuarioObjectId,
    })

    if (!documento) {
        throw crearError("Comando no encontrado", 404)
    }

    return convertirComando(documento)
}

export async function crearComando(datos, usuarioId) {
    const usuarioObjectId = convertirIdUsuario(usuarioId)
    const categoriaObjectId = await validarCategoria(datos.categoriaId, usuarioObjectId)
    const documento = {
        titulo: datos.titulo,
        instruccion: datos.instruccion,
        descripcion: datos.descripcion,
        categoriaId: categoriaObjectId,
        usuarioId: usuarioObjectId,
    }
    const resultado = await db.collection("comandos").insertOne(documento)

    return convertirComando({ ...documento, _id: resultado.insertedId })
}

export async function actualizarComando(id, datos, usuarioId) {
    const comandoId = convertirId(id)
    const usuarioObjectId = convertirIdUsuario(usuarioId)
    const categoriaObjectId = await validarCategoria(datos.categoriaId, usuarioObjectId)
    const resultado = await db.collection("comandos").findOneAndUpdate(
        { _id: comandoId, usuarioId: usuarioObjectId },
        {
            $set: {
                titulo: datos.titulo,
                instruccion: datos.instruccion,
                descripcion: datos.descripcion,
                categoriaId: categoriaObjectId,
            },
        },
        { returnDocument: "after" },
    )
    const documento = resultado?.value ?? resultado

    if (!documento) {
        throw crearError("Comando no encontrado", 404)
    }

    return convertirComando(documento)
}

export async function eliminarComando(id, usuarioId) {
    const comandoId = convertirId(id)
    const usuarioObjectId = convertirIdUsuario(usuarioId)
    const resultado = await db.collection("comandos").deleteOne({
        _id: comandoId,
        usuarioId: usuarioObjectId,
    })

    if (!resultado.deletedCount) {
        throw crearError("Comando no encontrado", 404)
    }

    return { message: "Comando eliminado" }
}
