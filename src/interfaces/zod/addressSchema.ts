import { z } from "zod";
import { IAddress } from "../../entities/Address";

export const addressSchema = z.object({
  addressableType: z.enum(["user", "company"]),
  street: z.string(),
  number: z.number(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
}) satisfies z.ZodType<IAddress>;
