import { IAddress } from "../entities/Address";
import { IPatient } from "../entities/Patient";
import Address from "../frameworks/db/sequelize/addressModel";
import PatientModel from "../frameworks/db/sequelize/patientModel";

export interface IPatientWithAddress extends IPatient {
  address: IAddress;
}

export interface IPatientRepository {
  create(patient: IPatient): Promise<{ success: boolean; name: string }>;
  findOne(patientId: number): Promise<IPatient | null>;
  findOneWithAddress(patientId: number): Promise<IPatientWithAddress | null>;
}

export class PatientRepository implements IPatientRepository {
  create(
    patientPayload: IPatient
  ): Promise<{ success: boolean; name: string }> {
    return PatientModel.create(patientPayload, { include: [Address] });
  }

  findOne(patientId: number): Promise<IPatient> {
    return PatientModel.findByPk(patientId);
  }

  findOneWithAddress(patientId: number): Promise<IPatientWithAddress> {
    return PatientModel.findOne({
      where: { id: patientId },
      include: { model: Address, as: "address" },
    });
  }
}
