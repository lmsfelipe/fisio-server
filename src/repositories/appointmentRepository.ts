import { IAppointment } from "../entities/Appointment";
import { IPatient } from "../entities/Patient";
import { IProfessional } from "../entities/Professional";
import sequelize from "../interfaces/db/sequelize";
import AppointmentModel from "../interfaces/db/sequelize/appointmentModel";
import Patient from "../interfaces/db/sequelize/patientModel";
import Professional from "../interfaces/db/sequelize/professionalModel";

export interface IAppointmentRepository {
  create(
    appointment: IAppointment
  ): Promise<{ success: boolean; error?: any; name?: string }>;
  findOne(id: number): Promise<IAppointment | null>;
}

export class AppointmentRepository implements IAppointmentRepository {
  async create(
    payload: IAppointment
  ): Promise<{ success: boolean; error?: any; name?: string }> {
    try {
      const result = await sequelize.transaction(async (transaction: any) => {
        const patient: IPatient = await Patient.findByPk(payload.patientId, {
          transaction,
        });

        const professional: IProfessional = await Professional.findByPk(
          payload.professionalId,
          { transaction }
        );

        payload.patientName = patient.name;
        payload.professionalName = professional.name;

        await AppointmentModel.create(payload, {
          transaction,
          include: [Patient, Professional],
        });
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number): Promise<IAppointment> {
    return AppointmentModel.findByPk(id);
  }
}
