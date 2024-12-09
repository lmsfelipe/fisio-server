import { IOwner } from "../entities/Owner";
import { IUser } from "../entities/User";
import Address from "../interfaces/db/sequelize/models/addressModel";
import OwnerModel from "../interfaces/db/sequelize/models/ownerModel";
import UserModel from "../interfaces/db/sequelize/models/userModel";

export interface IOwnerPayload extends IUser {
  owner: IOwner;
}

export interface IOwnerRepository {
  create(payload: IOwnerPayload): Promise<{ success: boolean; id: string }>;
  findOne(ownerId: string): Promise<IOwner | null>;
}

export class OwnerRepository implements IOwnerRepository {
  create(payload: IOwnerPayload): Promise<{ success: boolean; id: string }> {
    return UserModel.create(payload, {
      include: [{ model: Address }, { model: OwnerModel, include: Address }],
    });
  }

  findOne(userId: string): Promise<IOwner> {
    return OwnerModel.findOne({ where: { userId } });
  }
}
