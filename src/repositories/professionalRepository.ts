import { IProfessional } from "../entities/Professional";
import { IUser } from "../entities/User";
import Address from "../interfaces/db/sequelize/addressModel";
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
}
