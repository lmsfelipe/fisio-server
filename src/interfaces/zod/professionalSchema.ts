import { z } from "zod";
import { userSchema } from "./userSchema";
import { IProfessional } from "../../entities/Professional";

const professionalSchema = z.object({
  specialization: z.enum(["phisio", "speech", "secretary"]),
}) satisfies z.ZodType<IProfessional>;

export const professionalPayloadSchema = userSchema.extend({
  professional: professionalSchema,
});
