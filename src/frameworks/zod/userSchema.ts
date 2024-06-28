import { z } from "zod";

// Login
export const loginSchema = z.object({
  email: z.string().email({ message: "E-mail deve ser válido" }),
  password: z.string(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
