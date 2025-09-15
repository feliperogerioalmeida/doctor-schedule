"use server";
import { db } from "@/src/db";
import { upsertDoctorSchema } from "./schema";
import { doctorsTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/src/lib/next-safe-action";

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não encontrado");
    }

    if (!session?.user.clinic) {
      throw new Error("Clínica não encontrada");
    }

    await db
      .insert(doctorsTable)
      .values({
        id: parsedInput.id,
        clinicId: session?.user.clinic.id,
        ...parsedInput,
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
        },
      });
  });
