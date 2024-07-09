import { z } from "zod";
import { userSchema } from "./userSchema";
import { IOwner } from "../../entities/Owner";
import { addressSchema } from "./addressSchema";

const ownerSchema = z.object({
  name: z.string(),
  companyName: z.string(),
  cnpj: z.string(),
  address: addressSchema,
}) satisfies z.ZodType<IOwner>;

export const ownerPayloadSchema = userSchema.extend({
  owner: ownerSchema,
});
