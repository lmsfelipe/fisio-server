import { z } from "zod";
import { IAppointment } from "../../entities/Appointment";

export const appointmentSchema = z.object({
  id: z.optional(z.number()),
  dateStart: z.coerce.date(),
  dateEnd: z.coerce.date(),
  location: z.enum(["clinic", "home"]),
  patientId: z.string(),
  professionalId: z.string(),
  observation: z.string(),
}) satisfies z.ZodType<IAppointment>;
