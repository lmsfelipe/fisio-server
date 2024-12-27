import { z } from "zod";
import { userSchema } from "./userSchema";
import { addressSchema } from "./addressSchema";
import { ICompanyPayload } from "../../repositories/companyRepository";

const companySchema = z.object({
  name: z.string(),
  companyName: z.string(),
  cnpj: z.string(),
  address: addressSchema,
  logo: z.optional(z.instanceof(File)),
  user: userSchema,
}) satisfies z.ZodType<ICompanyPayload>;

export const companyPayloadSchema = userSchema.extend({
  company: companySchema,
});
