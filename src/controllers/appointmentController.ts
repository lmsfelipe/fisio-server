import { AppointmentRepository } from "../repositories/appointmentRepository";
import { CreateAppointment } from "../use-cases/appointment/createAppointment";
import { FindAppointment } from "../use-cases/appointment/findAppointment";

const appointmentRepository = new AppointmentRepository();

export const appointmentController = {
  // TODO: Replace `any` for properly types
  async createAppointment(req: any, res: any) {
    const createAppointment = new CreateAppointment(appointmentRepository);

    try {
      await createAppointment.execute(req.body);

      res.type("application/json").code(200);
      return { success: true };
    } catch (error) {
      res.type("application/json").code(400);

      return { error };
    }
  },

  async findAppointment(req: any, res: any) {
    const findAppointment = new FindAppointment(appointmentRepository);

    try {
      const response = await findAppointment.execute(req.params.id);
      res.type("application/json").code(200);

      return response;
    } catch (error) {
      res.type("application/json").code(400);

      return { error };
    }
  },
};
