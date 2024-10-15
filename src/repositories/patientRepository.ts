import { IPatient } from "../entities/Patient";
import { IUser } from "../entities/User";
import Address from "../interfaces/db/sequelize/models/addressModel";
import PatientModel from "../interfaces/db/sequelize/models/patientModel";
import UserModel from "../interfaces/db/sequelize/models/userModel";

export interface IPatientPayload extends IUser {
  patient: IPatient;
}

export interface IPatientRepository {
  create(payload: IPatientPayload): Promise<{ success: boolean; name: string }>;
  findAll(ownerId: number): Promise<IPatient[] | null>;
  findCompletePatient(userId: number): Promise<IPatientPayload | null>;
}

export class PatientRepository implements IPatientRepository {
  create(
    payload: IPatientPayload
  ): Promise<{ success: boolean; name: string }> {
    return UserModel.create(payload, { include: [Address, PatientModel] });
  }

  findAll(ownerId: number): Promise<IPatient[]> {
    return PatientModel.findAll({ where: { ownerId } });
  }

  findCompletePatient(userId: number): Promise<IPatientPayload | null> {
    return UserModel.findOne({
      where: { userId },
      include: [
        { model: Address, as: "address" },
        { model: PatientModel, as: "patient" },
      ],
    });
  }
}
