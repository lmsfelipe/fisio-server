import { IUser } from "../entities/User";
import UserModel from "../frameworks/db/sequelize/userModel";

export interface IUserRepository {
  findOne(email: string): Promise<IUser | null>;
}

export class UserRepository implements IUserRepository {
  findOne(email: string): Promise<IUser | null> {
    return UserModel.findOne({ where: { email } });
  }
}
