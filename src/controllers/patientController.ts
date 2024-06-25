import { PatientRepository } from "../repositories/patientRepository";
import { CreatePatient } from "../use-cases/patient/createPatient";
import { FindPatient } from "../use-cases/patient/findPatient";
import { FindCompletePatient } from "../use-cases/patient/findCompletePatient";

const patientRepository = new PatientRepository();

export const patientController = {
  // TODO: Replace `any` for properly types
  async createPatient(req: any, res: any) {
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

  async findPatient(req: any, res: any) {
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

  async findCompletePatient(req: any, res: any) {
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
