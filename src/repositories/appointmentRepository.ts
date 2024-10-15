import { col, fn, Op, Sequelize } from "sequelize";
import { IAppointment, StatusEnum } from "../entities/Appointment";
import { IPatient } from "../entities/Patient";
import { IProfessional } from "../entities/Professional";
import sequelize from "../interfaces/db/sequelize";
import AppointmentModel from "../interfaces/db/sequelize/models/appointmentModel";
import Patient from "../interfaces/db/sequelize/models/patientModel";
import Professional from "../interfaces/db/sequelize/models/professionalModel";

export interface IAppointmentRepository {
  create(
    appointment: IAppointment
  ): Promise<{ success: boolean; error?: any; name?: string }>;
  edit(appointment: IAppointment): Promise<{ success: boolean; error?: any }>;
  findOne(id: string): Promise<IAppointment | null>;
  editMultipleStatus(
    status: string
  ): Promise<{ success: boolean; error?: any }>;
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
      throw new Error("Não foi possível criar o agendamento", { cause: error });
    }
  }

  async edit(
    payload: IAppointment
  ): Promise<{ success: boolean; error?: any }> {
    try {
      await sequelize.transaction(async (transaction: any) => {
        // TODO: Reuse this
        const patient: IPatient = await Patient.findByPk(payload.patientId, {
          transaction,
        });

        const professional: IProfessional = await Professional.findByPk(
          payload.professionalId,
          { transaction }
        );

        payload.patientName = patient.name;
        payload.professionalName = professional.name;
        await AppointmentModel.update(payload, { where: { id: payload.id } });
      });

      return { success: true };
    } catch (error) {
      throw new Error("Não foi possível editar o agendamento", {
        cause: error,
      });
    }
  }

  findOne(id: string): Promise<IAppointment> {
    return AppointmentModel.findByPk(id);
  }

  async editMultipleStatus(status: StatusEnum) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return AppointmentModel.update(
      { status },
      {
        where: Sequelize.where(fn("DATE", col("dateStart")), {
          [Op.eq]: new Date(yesterday),
        }),
      }
    );
  }
}
