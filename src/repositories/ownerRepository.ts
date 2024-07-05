import { IOwner } from "../entities/Owner";
import { IUser } from "../entities/User";
import Address from "../interfaces/db/sequelize/addressModel";
import OwnerModel from "../interfaces/db/sequelize/ownerModel";
import Patient from "../interfaces/db/sequelize/patientModel";
import Professional from "../interfaces/db/sequelize/professionalModel";
import UserModel from "../interfaces/db/sequelize/userModel";

export interface IOwnerPayload extends IUser {
  owner: IOwner;
}

export interface IOwnerRepository {
  create(payload: IOwnerPayload): Promise<{ success: boolean; name: string }>;
  findOne(ownerId: string): Promise<IOwnerPayload | null>;
}

export class OwnerRepository implements IOwnerRepository {
  create(payload: IOwnerPayload): Promise<{ success: boolean; name: string }> {
    return UserModel.create(payload, {
      include: [{ model: Address }, { model: OwnerModel, include: Address }],
    });
  }

  findOne(id: string): Promise<IOwnerPayload> {
    return OwnerModel.findOne({
      where: { id },
      include: [
        { model: Professional, as: "professionals" },
        { model: Patient, as: "patients" },
      ],
    });
  }
}
