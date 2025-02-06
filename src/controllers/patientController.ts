import {
  IPatientPayload,
  PatientRepository,
} from "../repositories/patientRepository";
import { CreatePatient } from "../use-cases/patient/createPatient";
import { FindPatients } from "../use-cases/patient/findPatients";
import { FindCompletePatient } from "../use-cases/patient/findCompletePatient";
import {
  TBodyRequest,
  TParamsRequest,
  FastifyReply,
  FastifyRequest,
} from "../interfaces/fastify/requestTypes";
import { decodeFromAuth } from "../utils/decodeFromAuth";

const patientRepository = new PatientRepository();

export const patientController = {
  async createPatient(req: TBodyRequest<IPatientPayload>, res: FastifyReply) {
    const decodedToken = decodeFromAuth(req.headers.authorization);
    const createPatient = new CreatePatient(patientRepository);

    try {
      const response = await createPatient.execute({
        ...req.body,
        companyId: decodedToken.companyId,
      });

      res.type("application/json").code(201);
      return { success: true, name: response.name };
    } catch (error) {
      if (error instanceof Error) {
        // TODO: standardize errors
        res.type("application/json").code(400);
        throw { message: error.message, error: error.cause };
      } else {
        res.type("application/json").code(500);
        throw { error: "Ocorreu um erro" };
      }
    }
  },

  async findPatients(req: FastifyRequest, res: FastifyReply) {
    const findPatients = new FindPatients(patientRepository);

    const { companyId } = decodeFromAuth(req.headers.authorization);

    try {
      const response = await findPatients.execute(companyId);
      res.type("application/json").code(200);

      return response;
    } catch (error) {
      res.type("application/json").code(400);

      throw { error };
    }
  },

  async findCompletePatient(
    req: TParamsRequest<{ id: number }>,
    res: FastifyReply
  ) {
    const findCompletePatient = new FindCompletePatient(patientRepository);

    try {
      const response = await findCompletePatient.execute(req.params.id);
      res.type("application/json").code(200);

      return response;
    } catch (error) {
      res.type("application/json").code(400);

      throw { error };
    }
  },
};
