import z from "zod"

export const usuariosRegistroSchema = z.object({
    nombre: z.string("El nombre es obligatorio").min(1, "El nombre es obligatorio"),
    correo: z.email("El correo tiene que ser válido"),
    contraseña: z.string("La contraseña es obligatoria").min(1, "La contraseña es obligatoria"),
})

export const usuariosLoginSchema = z.object({
    correo: z.email("El correo tiene que ser válido"),
    contraseña: z.string("La contraseña es obligatoria").min(1, "La contraseña es obligatoria"),
})

export const usuariosActualizarSchema = z.object({
    nombre: z.string("El nombre es obligatorio").trim().min(1, "El nombre es obligatorio"),
}).strict()
