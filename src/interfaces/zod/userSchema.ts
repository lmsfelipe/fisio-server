import { z } from "zod";
import { Gender, IUser, UserType } from "../../entities/User";
import { addressSchema } from "./addressSchema";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "E-mail deve ser válido" }),
  password: z.string(),
  birthday: z.coerce.date(),
  cpf: z.string().length(11),
  gender: z.enum([Gender.FEMALE, Gender.MALE, Gender.OTHER]),
  phone: z.string().length(11),
  photo: z.optional(z.string()),
  address: addressSchema,
  userType: z.optional(
    z.enum([UserType.OWNER, UserType.PATIENT, UserType.PROFESSIONAL])
  ),
}) satisfies z.ZodType<IUser>;

// Login
type TLogin = Pick<IUser, "email" | "password">;

export const loginSchema = z.object({
  email: z.string().email({ message: "E-mail deve ser válido" }),
  password: z.string(),
}) satisfies z.ZodType<TLogin>;

export type TLoginSchema = z.infer<typeof loginSchema>;
