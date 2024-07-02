import { IProfessional } from "../entities/Professional";
import { IUser } from "../entities/User";
import Address from "../interfaces/db/sequelize/addressModel";
import Appointment from "../interfaces/db/sequelize/appointmentModel";
import ProfessionalModel from "../interfaces/db/sequelize/professionalModel";
import UserModel from "../interfaces/db/sequelize/userModel";

export interface IProfessionalPayload extends IUser {
  professional: IProfessional;
}

export interface IProfessionalRepository {
  create(
    professional: IProfessionalPayload
  ): Promise<{ success: boolean; name: string }>;
  findOne(id: number): Promise<IProfessional | null>;
  findOneWithAppointments(id: number): Promise<IProfessional | null>;
}

export class ProfessionalRepository implements IProfessionalRepository {
  create(
    payload: IProfessionalPayload
  ): Promise<{ success: boolean; name: string }> {
    return UserModel.create(payload, { include: [Address, ProfessionalModel] });
  }

  findOne(id: number): Promise<IProfessional> {
    return ProfessionalModel.findByPk(id);
  }

  findOneWithAppointments(id: number): Promise<IProfessional> {
    return ProfessionalModel.findOne({
      where: { id },
      include: { model: Appointment },
    });
  }
}
