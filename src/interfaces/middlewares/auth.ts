import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "mysupersecret";

function authError() {
  const error = new Error("Usuário não autenticado.");
  error.status = 401;
  throw error;
}

export function auth(req, reply, done) {
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
