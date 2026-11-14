import { z } from "zod"

export const comandoSchema = z.object({
  titulo: z
    .string("El título es obligatorio")
    .trim()
    .min(1, "El título es obligatorio"),
  instruccion: z
    .string("La instrucción es obligatoria")
    .trim()
    .min(1, "La instrucción es obligatoria"),
  descripcion: z
    .string("La descripción es obligatoria")
    .trim()
    .min(1, "La descripción es obligatoria"),
  categoriaId: z
    .string("La categoría es obligatoria")
    .trim()
    .min(1, "Elegí una categoría")
    .regex(/^[a-f\d]{24}$/i, "La categoría no es válida"),
})
