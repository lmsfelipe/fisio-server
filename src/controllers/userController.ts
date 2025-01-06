import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/userRepository";
import { FindUser } from "../use-cases/user/findUser";
import { TLoginSchema } from "../interfaces/zod/userSchema";
import {
  TBodyRequest,
  FastifyReply,
  TParamsRequest,
  FastifyRequest,
} from "../interfaces/fastify/requestTypes";
import { FindUserProfessional } from "../use-cases/user/findUserProfessional";
import { decodeFromAuth } from "../utils/decodeFromAuth";

const userRepository = new UserRepository();
const jwtSecret = process.env.JWT_SECRET || "mysupersecret";

export const userController = {
  async login(req: TBodyRequest<TLoginSchema>, res: FastifyReply) {
    const findUser = new FindUser(userRepository);

    const { email, password } = req.body;

    try {
      const user = await findUser.execute("email", email);
      const errorMessage = "Nenhum usuário foi encontrado";

      if (!user) {
        throw new Error(errorMessage);
      }

      const { id, userType, companyId } = user;

      if (password !== user.password) {
        throw new Error(errorMessage);
      }

      const token = jwt.sign({ userId: id, userType, companyId }, jwtSecret, {
        expiresIn: "1y",
      });

      res.type("application/json").code(200);
      return { token, id, companyId };
    } catch (error) {
      if (error instanceof Error) {
        // TODO: standardize errors
        res.type("application/json").code(401);
        throw { error: error.message };
      } else {
        res.type("application/json").code(500);
        throw { error: "Something went wrong" };
      }
    }
  },

  async findUser(req: FastifyRequest, reply: FastifyReply) {
    const findUser = new FindUser(userRepository);

    try {
      const decodedToken = decodeFromAuth(req.headers.authorization);
      const response = await findUser.execute("id", decodedToken.userId);

      reply.type("application/json").code(200);
      return response;
    } catch (error) {
      reply.type("application/json").code(400);

      throw { error };
    }
  },

  async findUserProfessional(
    req: TParamsRequest<{ email: string }>,
    reply: FastifyReply
  ) {
    const findUserProfessional = new FindUserProfessional(userRepository);

    try {
      const response = await findUserProfessional.execute(req.params.email);
      reply.type("application/json").code(200);
      return { data: response };
    } catch (error) {
      reply.type("application/json").code(400);

      throw { error };
    }
  },
};
