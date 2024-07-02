import { ProfessionalRepository } from "../repositories/professionalRepository";
import { CreateProfessional } from "../use-cases/professional/createProfessional";
import { FindProfessional } from "../use-cases/professional/findProfessional";
import { FindProfessionalAppointments } from "../use-cases/professional/findProfessionalAppointments";

const professionalRepository = new ProfessionalRepository();

export const professionalController = {
  // TODO: Replace `any` for properly types
  async createProfessional(req: any, res: any) {
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

  async findProfessional(req: any, res: any) {
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

  async findProfessionalAppointments(req: any, res: any) {
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
};
