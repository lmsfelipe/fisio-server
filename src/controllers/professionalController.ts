import {
  FastifyReply,
  FastifyRequest,
  TBodyRequest,
  TParamsRequest,
} from "../interfaces/fastify/requestTypes";
import {
  IProfessionalPayload,
  ProfessionalRepository,
} from "../repositories/professionalRepository";
import { CreateProfessional } from "../use-cases/professional/createProfessional";
import { FindProfessional } from "../use-cases/professional/findProfessional";
import { FindProfessionalAppointments } from "../use-cases/professional/findProfessionalAppointments";
import { FindProfessionalsAppointments } from "../use-cases/professional/findProfessionalsAppointments";

const professionalRepository = new ProfessionalRepository();

export const professionalController = {
  async createProfessional(
    req: TBodyRequest<IProfessionalPayload>,
    res: FastifyReply
  ) {
    const createProfessional = new CreateProfessional(professionalRepository);

    try {
      const response = await createProfessional.execute(req.body);

      res.type("application/json").code(200);
      return { success: true, name: response.name };
    } catch (error) {
      res.type("application/json").code(400);

      return { error };
    }
  },

  async findProfessional(
    req: TParamsRequest<{ id: number }>,
    res: FastifyReply
  ) {
    const findProfessional = new FindProfessional(professionalRepository);

    try {
      const response = await findProfessional.execute(req.params.id);
      res.type("application/json").code(200);

      return response;
    } catch (error) {
      res.type("application/json").code(400);

      return { error };
    }
  },

  async findProfessionalAppointments(
    req: TParamsRequest<{ id: number }>,
    res: FastifyReply
  ) {
    const findProfessionalWithAppointments = new FindProfessionalAppointments(
      professionalRepository
    );

    try {
      const response = await findProfessionalWithAppointments.execute(
        req.params.id
      );
      res.type("application/json").code(200);

      return response;
    } catch (error) {
      res.type("application/json").code(400);

      return { error };
    }
  },

  async findProfessionalsAppointments(_req: FastifyRequest, res: FastifyReply) {
    const findProfessionalsWithAppointments = new FindProfessionalsAppointments(
      professionalRepository
    );

    try {
      const response = await findProfessionalsWithAppointments.execute();
      res.type("application/json").code(200);

      return response;
    } catch (error) {
      res.type("application/json").code(400);

      return { error };
    }
  },
};
