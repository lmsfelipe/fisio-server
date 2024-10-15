import { z } from "zod";
import {
  IAppointment,
  LocationEnum,
  StatusEnum,
} from "../../entities/Appointment";

export const appointmentSchema = z.object({
  id: z.optional(z.number()),
  dateStart: z.coerce.date(),
  dateEnd: z.coerce.date(),
  location: z.enum([LocationEnum.CLINIC, LocationEnum.HOME]),
  patientId: z.string(),
  professionalId: z.string(),
  observation: z.string(),
  status: z.optional(
    z.enum([
      StatusEnum.OPENED,
      StatusEnum.CLOSED,
      StatusEnum.MISSED,
      StatusEnum.CANCELED,
    ])
  ),
}) satisfies z.ZodType<IAppointment>;

export const appointmentStatusSchema = z.object({
  status: z.enum([
    StatusEnum.OPENED,
    StatusEnum.CLOSED,
    StatusEnum.MISSED,
    StatusEnum.CANCELED,
  ]),
});
