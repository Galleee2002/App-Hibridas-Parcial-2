import { MongoClient, ObjectId } from "mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const client = new MongoClient(process.env.MONGODB_URI)
const db = client.db(process.env.MONGODB_DB)
const coleccion = db.collection("usuarios")

let indiceCorreoListo = false

async function asegurarIndiceCorreo() {
    if (indiceCorreoListo) return
    await coleccion.createIndex({ correo: 1 }, { unique: true })
    indiceCorreoListo = true
}

function mapearUsuario(documento) {
    return {
        id: documento._id.toString(),
        nombre: documento.nombre,
        correo: documento.correo,
    }
}

export async function registrarUsuario(datos) {
    await asegurarIndiceCorreo()

    const existente = await coleccion.findOne({ correo: datos.correo })
    if (existente) {
        const error = new Error("El correo ya está registrado")
        error.status = 409
        throw error
    }

    const hash = await bcrypt.hash(datos.contraseña, 10)

    try {
        const resultado = await coleccion.insertOne({
            nombre: datos.nombre,
            correo: datos.correo,
            contraseña: hash,
        })

        return {
            id: resultado.insertedId.toString(),
            nombre: datos.nombre,
            correo: datos.correo,
        }
    } catch (error) {
        if (error?.code === 11000) {
            const duplicado = new Error("El correo ya está registrado")
            duplicado.status = 409
            throw duplicado
        }
        throw error
    }
}

export async function loginUsuario(credenciales) {
    const usuarioDB = await coleccion.findOne({ correo: credenciales.correo })
    if (!usuarioDB) {
        const error = new Error("Correo o contraseña incorrectos")
        error.status = 401
        throw error
    }

    const valido = await bcrypt.compare(credenciales.contraseña, usuarioDB.contraseña)
    if (!valido) {
        const error = new Error("Correo o contraseña incorrectos")
        error.status = 401
        throw error
    }

    const usuario = mapearUsuario(usuarioDB)
    const token = jwt.sign(
        { id: usuario.id, correo: usuario.correo },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    )

    return { token, usuario }
}

export async function obtenerUsuarioPorId(id) {
    if (!ObjectId.isValid(id)) {
        const error = new Error("Usuario no encontrado")
        error.status = 404
        throw error
    }

    const usuarioDB = await coleccion.findOne({ _id: new ObjectId(id) })
    if (!usuarioDB) {
        const error = new Error("Usuario no encontrado")
        error.status = 404
        throw error
    }

    return mapearUsuario(usuarioDB)
}
