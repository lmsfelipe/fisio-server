import {
  FastifyReply,
  FastifyRequest,
  TBodyRequest,
  TParamsRequest,
} from "../interfaces/fastify/requestTypes";
import {
  IOwnerPayload,
  OwnerRepository,
} from "../repositories/ownerRepository";
import { CreateOwner } from "../use-cases/owner/createOwner";
import { FindOwner } from "../use-cases/owner/findOwner";

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

      return { error };
    }
  },

  async findOneOwner(req: TParamsRequest<{ id: string }>, res: FastifyReply) {
    const findOwner = new FindOwner(ownerRepository);

    try {
      const response = await findOwner.execute(req.params.id);

      res.type("application/json").code(200);
      return response;
    } catch (error) {
      res.type("application/json").code(400);
      console.log("owner", error);

      return { error };
    }
  },
};
