import { z } from "zod";
import {
  IAppointment,
  LocationEnum,
  StatusEnum,
} from "../../entities/Appointment";

export const appointmentSchema = z.object({
  id: z.optional(z.number()),
  patientId: z.string(),
  professionalId: z.string(),
  dateStart: z.coerce.date(),
  dateEnd: z.coerce.date(),
  location: z.enum([LocationEnum.CLINIC, LocationEnum.HOME]),
  observation: z.string(),
  status: z.optional(
    z.enum([StatusEnum.OPENED, StatusEnum.CLOSED, StatusEnum.MISSED])
  ),
}) satisfies z.ZodType<IAppointment>;

export const appointmentStatusSchema = z.object({
  id: z.number(),
  status: z.enum([StatusEnum.OPENED, StatusEnum.CLOSED, StatusEnum.MISSED]),
});

export const deleteappointmentSchema = z.number();
