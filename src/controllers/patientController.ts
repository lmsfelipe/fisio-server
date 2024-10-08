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
} from "../interfaces/fastify/requestTypes";

const patientRepository = new PatientRepository();

export const patientController = {
  async createPatient(req: TBodyRequest<IPatientPayload>, res: FastifyReply) {
    const createPatient = new CreatePatient(patientRepository);

    try {
      const response = await createPatient.execute(req.body);

      res.type("application/json").code(200);
      return { success: true, name: response.name };
    } catch (error) {
      res.type("application/json").code(400);

      throw { error };
    }
  },

  async findPatients(
    req: TParamsRequest<{ ownerId: number }>,
    res: FastifyReply
  ) {
    const findPatients = new FindPatients(patientRepository);

    try {
      const response = await findPatients.execute(req.params.ownerId);
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
