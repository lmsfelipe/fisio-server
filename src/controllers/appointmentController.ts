import { IAppointment } from "../entities/Appointment";
import {
  FastifyReply,
  TBodyRequest,
  TParamsRequest,
} from "../interfaces/fastify/requestTypes";
import { AppointmentRepository } from "../repositories/appointmentRepository";
import { CreateAppointment } from "../use-cases/appointment/createAppointment";
import { EditAppointment } from "../use-cases/appointment/editAppointment";
import { EditMultipleStatusAppointment } from "../use-cases/appointment/editMultipleStatusAppointments";
import { FindAppointment } from "../use-cases/appointment/findAppointment";

const appointmentRepository = new AppointmentRepository();

export const appointmentController = {
  async createAppointment(
    req: TBodyRequest<IAppointment>,
    reply: FastifyReply
  ) {
    const createAppointment = new CreateAppointment(appointmentRepository);

    try {
      await createAppointment.execute(req.body);

      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ success: true });
    } catch (error) {
      reply.type("application/json").code(400);
    }
  },

  async editAppointment(req: TBodyRequest<IAppointment>, reply: FastifyReply) {
    const editAppointment = new EditAppointment(appointmentRepository);

    try {
      await editAppointment.execute(req.body);

      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ success: true });
    } catch (error) {
      reply.type("application/json").code(400);
    }
  },

  async editMultipleStatusAppointment(
    req: TBodyRequest<{ status: string }>,
    reply: FastifyReply
  ) {
    const editMultipleStatusAppointment = new EditMultipleStatusAppointment(
      appointmentRepository
    );

    try {
      await editMultipleStatusAppointment.execute(req.body.status);

      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ success: true });
    } catch (error) {
      reply.type("application/json").code(400);
    }
  },

  async findAppointment(
    req: TParamsRequest<{ id: string }>,
    res: FastifyReply
  ) {
    const findAppointment = new FindAppointment(appointmentRepository);

    try {
      const response = await findAppointment.execute(req.params.id);
      res.type("application/json").code(200);

      return response;
    } catch (error) {
      res.type("application/json").code(400);

      throw { error };
    }
  },
};
