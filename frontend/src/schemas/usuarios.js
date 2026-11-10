import { z } from "zod"

export const loginSchema = z.object({
  correo: z.email("El correo tiene que ser válido"),
  contraseña: z
    .string("La contraseña es obligatoria")
    .min(1, "La contraseña es obligatoria"),
})

export const registroSchema = z
  .object({
    nombre: z
      .string("El nombre es obligatorio")
      .min(1, "El nombre es obligatorio"),
    correo: z.email("El correo tiene que ser válido"),
    contraseña: z
      .string("La contraseña es obligatoria")
      .min(1, "La contraseña es obligatoria"),
    confirmarContraseña: z
      .string("Confirmá la contraseña")
      .min(1, "Confirmá la contraseña"),
  })
  .refine((datos) => datos.contraseña === datos.confirmarContraseña, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarContraseña"],
  })
