import { IAddress } from "../entities/Address";
import { IPatient } from "../entities/Patient";
import { IUser } from "../entities/User";
import Address from "../interfaces/db/sequelize/addressModel";
import PatientModel from "../interfaces/db/sequelize/patientModel";
import UserModel from "../interfaces/db/sequelize/userModel";

export interface IPatientPayload extends IUser {
  patient: IPatient;
}

export interface IPatientRepository {
  create(payload: IPatientPayload): Promise<{ success: boolean; name: string }>;
  findOne(patientId: number): Promise<IPatient | null>;
  findCompletePatient(userId: number): Promise<IPatientPayload | null>;
}

export class PatientRepository implements IPatientRepository {
  create(
    payload: IPatientPayload
  ): Promise<{ success: boolean; name: string }> {
    return UserModel.create(payload, { include: [Address, PatientModel] });
  }

  findOne(id: number): Promise<IPatient> {
    return PatientModel.findByPk(id);
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
