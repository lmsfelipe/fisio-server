import { col, fn, Op, Sequelize } from "sequelize";

import { IAppointment } from "../entities/Appointment";
import { IProfessional } from "../entities/Professional";
import { IUser } from "../entities/User";
import Address from "../interfaces/db/sequelize/models/addressModel";
import Appointment from "../interfaces/db/sequelize/models/appointmentModel";
import ProfessionalModel from "../interfaces/db/sequelize/models/professionalModel";
import UserModel from "../interfaces/db/sequelize/models/userModel";

export interface IProfessionalPayload extends IUser {
  professional: IProfessional;
}

export interface IProfessionalWithAppointment extends IProfessional {
  appointments: IAppointment[];
}

export interface IProfessionalRepository {
  create(
    professional: IProfessionalPayload
  ): Promise<{ success: boolean; name: string }>;
  findAll(ownerId: number): Promise<IProfessional[] | null>;
  findOneWithAppointments(
    id: number
  ): Promise<IProfessionalWithAppointment | null>;
  findAllWithAppointments(
    date: string
  ): Promise<IProfessionalWithAppointment[] | []>;
}

export class ProfessionalRepository implements IProfessionalRepository {
  create(
    payload: IProfessionalPayload
  ): Promise<{ success: boolean; name: string }> {
    return UserModel.create(payload, { include: [Address, ProfessionalModel] });
  }

  findAll(ownerId: number): Promise<IProfessional[]> {
    return ProfessionalModel.findAll({
      where: { ownerId, specialization: "phisio" },
    });
  }

  findOneWithAppointments(id: number): Promise<IProfessionalWithAppointment> {
    return ProfessionalModel.findOne({
      where: { id },
      include: { model: Appointment },
    });
  }

  findAllWithAppointments(
    date: string
  ): Promise<IProfessionalWithAppointment[]> {
    return ProfessionalModel.findAll({
      where: {
        specialization: "phisio",
      },
      include: {
        model: Appointment,
        required: false,
        where: Sequelize.where(
          fn("DATE", col("dateStart")), // Extracts the date part of 'createdAt'
          {
            [Op.eq]: new Date(date), // Compares it to the specific date
          }
        ),
      },
    });
  }
}
