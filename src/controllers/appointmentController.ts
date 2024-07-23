import { IAppointment } from "../entities/Appointment";
import {
  FastifyReply,
  TBodyRequest,
  TParamsRequest,
} from "../interfaces/fastify/requestTypes";
import { AppointmentRepository } from "../repositories/appointmentRepository";
import { CreateAppointment } from "../use-cases/appointment/createAppointment";
import { FindAppointment } from "../use-cases/appointment/findAppointment";

const appointmentRepository = new AppointmentRepository();

export const appointmentController = {
  async createAppointment(req: TBodyRequest<IAppointment>, res: FastifyReply) {
    const createAppointment = new CreateAppointment(appointmentRepository);

    try {
      await createAppointment.execute(req.body);

      res.type("application/json").code(200);
      return { success: true };
    } catch (error) {
      res.type("application/json").code(400);

      return { error: error.message };
    }
  },

  async findAppointment(
    req: TParamsRequest<{ id: number }>,
    res: FastifyReply
  ) {
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
