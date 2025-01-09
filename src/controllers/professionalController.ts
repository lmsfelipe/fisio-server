import {
  FastifyReply,
  TBodyRequest,
  TParamsRequest,
  TQueryRequest,
} from "../interfaces/fastify/requestTypes";
import {
  IProfessionalPayload,
  ProfessionalRepository,
} from "../repositories/professionalRepository";
import { CreateProfessional } from "../use-cases/professional/createProfessional";
import { FindProfessionals } from "../use-cases/professional/findProfessionals";
import { FindProfessionalAppointments } from "../use-cases/professional/findProfessionalAppointments";
import { FindProfessionalsAppointments } from "../use-cases/professional/findProfessionalsAppointments";
import { decodeFromAuth } from "../utils/decodeFromAuth";

const professionalRepository = new ProfessionalRepository();

export const professionalController = {
  async createProfessional(
    req: TBodyRequest<IProfessionalPayload>,
    res: FastifyReply
  ) {
    const { companyId } = decodeFromAuth(req.headers.authorization);
    const createProfessional = new CreateProfessional(professionalRepository);

    try {
      const response = await createProfessional.execute({
        ...req.body,
        companyId,
      });

      res.type("application/json").code(200);
      return { success: true, name: response.name };
    } catch (error) {
      if (error instanceof Error) {
        // TODO: standardize errors
        res.type("application/json").code(400);
        console.log("error", error);
        throw { error: error.message };
      } else {
        res.type("application/json").code(500);
        throw { error: "Ocorreu um erro" };
      }
    }
  },

  async findProfessionals(
    req: TParamsRequest<{ companyId: number }>,
    res: FastifyReply
  ) {
    const findProfessionals = new FindProfessionals(professionalRepository);

    try {
      const response = await findProfessionals.execute(req.params.companyId);
      res.type("application/json").code(200);

      return response;
    } catch (error) {
      res.type("application/json").code(400);

      throw { error };
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

      throw { error };
    }
  },

  async findProfessionalsAppointments(
    req: TQueryRequest<{ date: string }>,
    res: FastifyReply
  ) {
    const findProfessionalsWithAppointments = new FindProfessionalsAppointments(
      professionalRepository
    );

    const { date } = req.query;

    if (!date) throw new Error("Uma data deve ser fornecida");

    try {
      // TODO: Mayve it can be removed with DefaultScope
      const { companyId } = decodeFromAuth(req.headers.authorization);
      const response = await findProfessionalsWithAppointments.execute(
        date,
        companyId
      );
      res.type("application/json").code(200);

      return response;
    } catch (error) {
      res.type("application/json").code(400);
      console.log("error => ", error);

      throw { error };
    }
  },
};
