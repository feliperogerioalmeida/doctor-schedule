"use server";
import { db } from "@/src/db";
import { upsertDoctorSchema } from "./schema";
import { doctorsTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/src/lib/next-safe-action";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .inputSchema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availbleFromTime = parsedInput.availableFromTime;
    const availbleToTime = parsedInput.availableToTime;

    const availbleFromTimeUTC = dayjs()
      .set("hour", parseInt(availbleFromTime.split(":")[0]))
      .set("minute", parseInt(availbleFromTime.split(":")[1]))
      .set("second", parseInt(availbleFromTime.split(":")[2]))
      .utc();

    const availbleToTimeUTC = dayjs()
      .set("hour", parseInt(availbleToTime.split(":")[0]))
      .set("minute", parseInt(availbleToTime.split(":")[1]))
      .set("second", parseInt(availbleToTime.split(":")[2]))
      .utc();

    const availbleFromWeekDay = parsedInput.availableFromWeekDay;
    const availbleToWeekDay = parsedInput.availableToWeekDay;

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
        ...parsedInput,
        id: parsedInput.id,
        clinicId: session?.user.clinic.id,
        availableFromTime: availbleFromTimeUTC.format("HH:mm:ss"),
        availableToTime: availbleToTimeUTC.format("HH:mm:ss"),
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          availableFromTime: availbleFromTimeUTC.format("HH:mm:ss"),
          availableToTime: availbleToTimeUTC.format("HH:mm:ss"),
        },
      });
    revalidatePath("/doctors");
  });
