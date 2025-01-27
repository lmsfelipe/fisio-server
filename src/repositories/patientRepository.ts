import { IPatient } from "../entities/Patient";
import { IUser } from "../entities/User";
import sequelize from "../interfaces/db/sequelize";
import Address from "../interfaces/db/sequelize/models/addressModel";
import PatientModel from "../interfaces/db/sequelize/models/patientModel";
import UserModel from "../interfaces/db/sequelize/models/userModel";

export interface IPatientPayload extends IUser {
  patient: IPatient;
}

export interface IPatientRepository {
  create(payload: IPatientPayload): Promise<{ success: boolean; name: string }>;
  findAll(companyId: string): Promise<IPatient[] | null>;
  findCompletePatient(userId: string): Promise<IPatientPayload | null>;
}

export class PatientRepository implements IPatientRepository {
  async create(
    payload: IPatientPayload
  ): Promise<{ success: boolean; name: string }> {
    const response = { success: false, name: "" };

    try {
      await sequelize.transaction(async (transaction: any) => {
        const { patient, ...user } = payload;

        const userResp: IUser = await UserModel.create(user, {
          transaction,
          include: [Address],
        });
        const patientResp: IPatient = await PatientModel.create(
          { ...patient, userId: userResp.id },
          { transaction }
        );

        response.success = true;
        response.name = patientResp.name;
      });
    } catch (error) {
      throw new Error("Não foi possível criar o paciente", { cause: error });
    }

    return response;
  }

  findAll(companyId: string): Promise<IPatient[]> {
    return PatientModel.findAll({ where: { companyId } });
  }

  findCompletePatient(userId: string): Promise<IPatientPayload | null> {
    return UserModel.findOne({
      where: { userId },
      include: [
        { model: Address, as: "address" },
        { model: PatientModel, as: "patient" },
      ],
    });
  }
}
