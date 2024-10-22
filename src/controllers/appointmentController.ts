import { IAppointment } from "../entities/Appointment";
import {
  FastifyReply,
  TBodyRequest,
  TParamsRequest,
} from "../interfaces/fastify/requestTypes";
import { AppointmentRepository } from "../repositories/appointmentRepository";
import { CreateAppointment } from "../use-cases/appointment/createAppointment";
import { DeleteAppointment } from "../use-cases/appointment/deleteAppointment";
import { EditAppointment } from "../use-cases/appointment/editAppointment";
import { EditStatusAppointment } from "../use-cases/appointment/editStatusAppointments";
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
        .send({ success: true, data: req.body });
    } catch (error) {
      reply.type("application/json").code(400);
    }
  },

  async deleteAppointment(req: TBodyRequest<number>, reply: FastifyReply) {
    const deleteAppointment = new DeleteAppointment(appointmentRepository);

    try {
      await deleteAppointment.execute(req.body);

      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ success: true });
    } catch (error) {
      reply.type("application/json").code(400);

      throw { error };
    }
  },

  async editAppointment(req: TBodyRequest<IAppointment>, reply: FastifyReply) {
    const editAppointment = new EditAppointment(appointmentRepository);

    try {
      await editAppointment.execute(req.body);

      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ success: true, data: req.body });
    } catch (error) {
      reply.type("application/json").code(400);
    }
  },

  async editStatusAppointment(
    req: TBodyRequest<{ id: string; status: string }>,
    reply: FastifyReply
  ) {
    const editStatusAppointment = new EditStatusAppointment(
      appointmentRepository
    );

    const { id, status } = req.body;

    try {
      await editStatusAppointment.execute(id, status);

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
