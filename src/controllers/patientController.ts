import {
  IPatientPayload,
  PatientRepository,
} from "../repositories/patientRepository";
import { CreatePatient } from "../use-cases/patient/createPatient";
import { FindPatient } from "../use-cases/patient/findPatient";
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

      return { error };
    }
  },

  async findPatient(req: TParamsRequest<{ id: number }>, res: FastifyReply) {
    const findPatient = new FindPatient(patientRepository);

    try {
      const response = await findPatient.execute(req.params.id);
      res.type("application/json").code(200);

      return response;
    } catch (error) {
      res.type("application/json").code(400);

      return { error };
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

      return { error };
    }
  },
};
