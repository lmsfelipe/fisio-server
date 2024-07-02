import { IAppointment } from "../entities/Appointment";
import AppointmentModel from "../interfaces/db/sequelize/appointmentModel";
import Patient from "../interfaces/db/sequelize/patientModel";
import Professional from "../interfaces/db/sequelize/professionalModel";

export interface IAppointmentRepository {
  create(
    appointment: IAppointment
  ): Promise<{ success: boolean; name: string }>;
  findOne(id: number): Promise<IAppointment | null>;
}

export class AppointmentRepository implements IAppointmentRepository {
  create(payload: IAppointment): Promise<{ success: boolean; name: string }> {
    return AppointmentModel.create(payload, {
      include: [Patient, Professional],
    });
  }

  findOne(id: number): Promise<IAppointment> {
    return AppointmentModel.findByPk(id);
  }
}
