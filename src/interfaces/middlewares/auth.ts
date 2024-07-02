import jwt from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "../fastify/requestTypes";

const jwtSecret = process.env.JWT_SECRET || "mysupersecret";

function authError() {
  const error: any = new Error("Usuário não autenticado.");
  error.status = 401;
  throw error;
}

export function auth(req: any, _: any, done: () => void) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return authError();
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, jwtSecret);
  } catch (err) {
    return authError();
  }

  if (!decodedToken) {
    return authError();
  }

  done();
}
