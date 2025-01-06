import { z } from "zod";
import { AddressableType, IAddress } from "../../entities/Address";

export const addressSchema = z.object({
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
}) satisfies z.ZodType<IAddress>;
