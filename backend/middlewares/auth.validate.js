import jwt from "jsonwebtoken"

export function validateToken(req, res, next) {
    try {
        const auth = req.headers.authorization
        if (!auth) throw new Error()
        const [bearer, token] = auth.split(" ")
        if (bearer !== "Bearer" || !token) throw new Error()
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = payload
        next()
    } catch (error) {
        res.status(401).json({ message: "Token inválido" })
    }
}
