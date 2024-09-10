import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/userRepository";
import { FindUser } from "../use-cases/user/findUser";
import { TLoginSchema } from "../interfaces/zod/userSchema";
import {
  TBodyRequest,
  FastifyReply,
  TParamsRequest,
} from "../interfaces/fastify/requestTypes";
import { FindUserProfessional } from "../use-cases/user/findUserProfessional";

const userRepository = new UserRepository();
const jwtSecret = process.env.JWT_SECRET || "mysupersecret";

export const userController = {
  async login(req: TBodyRequest<TLoginSchema>, res: FastifyReply) {
    const findOne = new FindUser(userRepository);

    const { email, password } = req.body;

    try {
      const user = await findOne.execute(email);

      if (!user) {
        throw new Error("No user has been found");
      }

      const { id, userType } = user;
      const isPasswordEqual = password === user.password;

      if (!isPasswordEqual) {
        throw new Error("Wrong password");
      }

      const token = jwt.sign({ id, userType }, jwtSecret, { expiresIn: "1y" });

      res.type("application/json").code(200);
      return { token };
    } catch (error) {
      res.type("application/json").code(400);

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
