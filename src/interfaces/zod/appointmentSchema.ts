import { z } from "zod";
import { IAppointment } from "../../entities/Appointment";

export const appointmentSchema = z.object({
  dateTime: z.coerce.date(),
  duration: z.number(),
  location: z.enum(["clinic", "home"]),
  patientId: z.string(),
  professionalId: z.string(),
  observation: z.string(),
}) satisfies z.ZodType<IAppointment>;
