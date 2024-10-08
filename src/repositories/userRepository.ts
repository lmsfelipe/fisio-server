import { IProfessional } from "../entities/Professional";
import { IUser } from "../entities/User";
import Professional from "../interfaces/db/sequelize/professionalModel";
import UserModel from "../interfaces/db/sequelize/userModel";

export interface IUserProfessional extends IUser {
  professional: IProfessional;
}

export interface IUserRepository {
  findOne(id: string): Promise<IUser | null>;
  findOneProfessional(id: string): Promise<IUserProfessional | null>;
}

export class UserRepository implements IUserRepository {
  findOne(id: string): Promise<IUser | null> {
    return UserModel.findOne({ where: { id } });
  }

  findOneProfessional(email: string): Promise<IUserProfessional | null> {
    return UserModel.findOne({ where: { email }, include: Professional });
  }
}
