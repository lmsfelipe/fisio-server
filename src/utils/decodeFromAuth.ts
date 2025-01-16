import { UserType } from "../entities/User";
import { decodeToken } from "../interfaces/middlewares/auth";

type TToken = {
  userId: string;
  userType: UserType;
  companyId: string;
};

export function decodeFromAuth(authToken?: string): TToken {
  if (!authToken) throw new Error("Usuário não autenticado");
  return decodeToken<TToken>(authToken);
}
