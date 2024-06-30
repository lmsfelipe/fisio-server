import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/userRepository";
import { FindUser } from "../use-cases/user/findUser";
import { TLoginSchema } from "../interfaces/zod/userSchema";
import { TBodyRequest, FastifyReply } from "../interfaces/fastify/requestTypes";

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

      const token = jwt.sign({ id, userType }, jwtSecret, { expiresIn: "1h" });

      res.type("application/json").code(200);
      return { token };
    } catch (error) {
      res.type("application/json").code(400);

      return { error };
    }
  },
};
