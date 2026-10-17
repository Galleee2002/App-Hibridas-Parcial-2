import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI)
const db = client.db(process.env.MONGODB_DB)

export async function getEstado() {
    await db.command({ ping: 1 })
    return { ok: true }
}
