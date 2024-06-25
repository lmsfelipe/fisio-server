import { IAddress } from "../entities/Address";
import { IPatient } from "../entities/Patient";
import { IUser } from "../entities/User";
import Address from "../frameworks/db/sequelize/addressModel";
import PatientModel from "../frameworks/db/sequelize/patientModel";
import UserModel from "../frameworks/db/sequelize/userModel";

export interface IPatientPayload extends IUser {
  patient: IPatient;
}

export interface IPatientWithAddress extends IPatient {
  address: IAddress;
}

export interface IPatientRepository {
  create(payload: IPatientPayload): Promise<{ success: boolean; name: string }>;
  findOne(patientId: number): Promise<IPatient | null>;
  findCompletePatient(userId: number): Promise<IPatientWithAddress | null>;
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

  findCompletePatient(userId: number): Promise<IPatientWithAddress | null> {
    return UserModel.findOne({
      where: { userId },
      include: [
        { model: Address, as: "address" },
        { model: PatientModel, as: "patient" },
      ],
    });
  }
}
