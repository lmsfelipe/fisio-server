import { z } from "zod";
import { userSchema } from "./userSchema";
import { addressSchema } from "./addressSchema";
import { ICompanyPayload } from "../../repositories/companyRepository";

export const companyPayloadSchema = z.object({
  companyName: z.string(),
  cnpj: z.string(),
  address: addressSchema,
  logo: z.optional(z.instanceof(File)),
  user: userSchema,
}) satisfies z.ZodType<ICompanyPayload>;
