import { z } from "zod";
import { userSchema } from "./userSchema";
import { IProfessional, Specialization } from "../../entities/Professional";

const professionalSchema = z.object({
  name: z.string(),
  specialization: z.enum([
    Specialization.PHISIO,
    Specialization.SECRETARY,
    Specialization.SPEECH,
  ]),
}) satisfies z.ZodType<IProfessional>;

export const professionalPayloadSchema = userSchema.extend({
  professional: professionalSchema,
});
