import { IAppointment } from "../entities/Appointment";
import AppointmentModel from "../frameworks/db/sequelize/appointmentModel";

export interface IAppointmentRepository {
  create(
    appointment: IAppointment
  ): Promise<{ success: boolean; name: string }>;
  findOne(id: number): Promise<IAppointment | null>;
}

export class AppointmentRepository implements IAppointmentRepository {
  create(payload: IAppointment): Promise<{ success: boolean; name: string }> {
    return AppointmentModel.create(payload);
  }

  findOne(id: number): Promise<IAppointment> {
    return AppointmentModel.findByPk(id);
  }
}
