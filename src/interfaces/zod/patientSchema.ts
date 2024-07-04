import { z } from "zod";
import { userSchema } from "./userSchema";
import { IPatient } from "../../entities/Patient";

const patientSchema = z.object({
  name: z.string(),
  ownerId: z.string(),
  fatherName: z.string(),
  motherName: z.string(),
  diagnosis: z.string(),
}) satisfies z.ZodType<IPatient>;

export const patientPayloadSchema = userSchema.extend({
  patient: patientSchema,
});
