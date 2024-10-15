import { IProfessional } from "../entities/Professional";
import { IUser } from "../entities/User";
import Professional from "../interfaces/db/sequelize/models/professionalModel";
import UserModel from "../interfaces/db/sequelize/models/userModel";

export interface IUserProfessional extends IUser {
  professional: IProfessional;
}

export interface IUserRepository {
  findOne(identifier: string, value: string | number): Promise<IUser | null>;
  findOneProfessional(id: string): Promise<IUserProfessional | null>;
}

export class UserRepository implements IUserRepository {
  findOne(identifier: string, value: string | number): Promise<IUser | null> {
    return UserModel.findOne({ where: { [identifier]: value } });
  }

  findOneProfessional(email: string): Promise<IUserProfessional | null> {
    return UserModel.findOne({ where: { email }, include: Professional });
  }
}
