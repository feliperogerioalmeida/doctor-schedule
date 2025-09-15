import { z } from "zod/v4";

export const upsertDoctorSchema = z
  .object({
    id: z.uuid().optional(),

    name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
    specialty: z
      .string()
      .trim()
      .min(1, { message: "Especialidade é obrigatória" }),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço é obrigatório" }),
    availableFromWeekDay: z.number().min(0).max(6),
    availableToWeekDay: z.number().min(0).max(6),
    availableFromTime: z
      .string()
      .trim()
      .min(1, { message: "Hora de início é obrigatório" }),
    availableToTime: z
      .string()
      .trim()
      .min(1, { message: "Hora de término é obrigatório" }),
    avatarImageUrl: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message:
        "O horário de inicio não pode ser anterior que o horário de término.",
      path: ["availableToTime"],
    },
  );

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;
