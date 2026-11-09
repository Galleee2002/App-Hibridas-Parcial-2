import { z } from "zod"

const camposComando = {
    titulo: z.string().trim().min(1, "El título es obligatorio"),
    instruccion: z.string().trim().min(1, "La instrucción es obligatoria"),
    descripcion: z.string().trim().min(1, "La descripción es obligatoria"),
    categoriaId: z.string().trim().regex(/^[a-f\d]{24}$/i, "La categoría no es válida"),
}

export const crearComandoSchema = z.object(camposComando)
export const actualizarComandoSchema = z.object(camposComando)
