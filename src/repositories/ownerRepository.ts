import { IOwner } from "../entities/Owner";
import { IUser } from "../entities/User";
import Address from "../interfaces/db/sequelize/models/addressModel";
import OwnerModel from "../interfaces/db/sequelize/models/ownerModel";
import Patient from "../interfaces/db/sequelize/models/patientModel";
import Professional from "../interfaces/db/sequelize/models/professionalModel";
import UserModel from "../interfaces/db/sequelize/models/userModel";

export interface IOwnerPayload extends IUser {
  owner: IOwner;
}

export interface IOwnerRepository {
  create(payload: IOwnerPayload): Promise<{ success: boolean; id: string }>;
  findOne(ownerId: string): Promise<IOwnerPayload | null>;
}

export class OwnerRepository implements IOwnerRepository {
  create(payload: IOwnerPayload): Promise<{ success: boolean; id: string }> {
    return UserModel.create(payload, {
      include: [{ model: Address }, { model: OwnerModel, include: Address }],
    });
  }

  findOne(id: string): Promise<IOwnerPayload> {
    return OwnerModel.findOne({
      where: { id },
      include: [
        {
          model: Professional,
          as: "professionals",
          where: { specialization: "phisio" },
        },
        { model: Patient, as: "patients" },
      ],
    });
  }
}
