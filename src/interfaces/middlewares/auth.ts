import jwt from "jsonwebtoken";

function authError() {
  const error: any = new Error("Usuário não autenticado.");
  error.status = 401;
  throw error;
}

export function decodeToken<TToken>(BeaderToken: string): TToken {
  const token = BeaderToken.split(" ")[1];

  return jwt.decode(token) as TToken;
}

export function auth(req: any, _: any, done: () => void) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return authError();
  }

  let decodedToken;

  try {
    decodedToken = decodeToken(authHeader);
  } catch (err) {
    return authError();
  }

  if (!decodedToken) {
    return authError();
  }

  done();
}
