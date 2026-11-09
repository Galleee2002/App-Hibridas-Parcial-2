import z from "zod"

const descripcionOpcional = z
    .string()
    .trim()
    .optional()
    .transform((valor) => (valor === "" || valor === undefined ? undefined : valor))

export const categoriasCrearSchema = z.object({
    nombre: z.string("El nombre es obligatorio").trim().min(1, "El nombre es obligatorio"),
    descripcion: descripcionOpcional,
})

export const categoriasActualizarSchema = z.object({
    nombre: z.string("El nombre es obligatorio").trim().min(1, "El nombre es obligatorio"),
    descripcion: descripcionOpcional,
})
