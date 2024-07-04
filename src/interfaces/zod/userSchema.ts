import { z } from "zod";
import { IUser } from "../../entities/User";

const addressSchema = z.object({
  street: z.string(),
  number: z.number(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "E-mail deve ser válido" }),
  password: z.string(),
  birthday: z.coerce.date(),
  cpf: z.string().length(11),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().length(11),
  photo: z.optional(z.instanceof(File)),
  address: addressSchema,
  userType: z.optional(z.enum(["patient", "professional", "owner"])),
}) satisfies z.ZodType<IUser>;

// Login
type TLogin = Pick<IUser, "email" | "password">;

export const loginSchema = z.object({
  email: z.string().email({ message: "E-mail deve ser válido" }),
  password: z.string(),
}) satisfies z.ZodType<TLogin>;

export type TLoginSchema = z.infer<typeof loginSchema>;
