import {
  FastifyReply,
  FastifyRequest,
  TBodyRequest,
  TParamsRequest,
} from "../interfaces/fastify/requestTypes";
import { decodeToken } from "../interfaces/middlewares/auth";
import {
  IOwnerPayload,
  OwnerRepository,
} from "../repositories/ownerRepository";
import { CreateOwner } from "../use-cases/owner/createOwner";
import { FindOwner } from "../use-cases/owner/findOwner";
import { decodeFromAuth } from "../utils/decodeFromAuth";

const ownerRepository = new OwnerRepository();

export const ownerController = {
  async createOwner(req: TBodyRequest<IOwnerPayload>, res: FastifyReply) {
    const createOwner = new CreateOwner(ownerRepository);

    try {
      const response = await createOwner.execute(req.body);

      res.type("application/json").code(200);
      return { success: true, id: response.id };
    } catch (error) {
      res.type("application/json").code(400);

      throw { error };
    }
  },

  async findOwner(req: FastifyRequest, reply: FastifyReply) {
    const findOwner = new FindOwner(ownerRepository);

    try {
      const decodedToken = decodeFromAuth(req.headers.authorization);
      const response = await findOwner.execute(decodedToken.userId);

      reply.type("application/json").code(200);
      return response;
    } catch (error) {
      reply.type("application/json").code(400);

      throw { error };
    }
  },
};
