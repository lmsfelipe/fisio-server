import { Patient } from "../../entities/Patient";
import { User, UserType } from "../../entities/User";
import {
  IPatientRepository,
  IPatientPayload,
} from "../../repositories/patientRepository";

export class CreatePatient {
  patientRepository: IPatientRepository;

  constructor(patientRepository: IPatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(
    data: IPatientPayload
  ): Promise<{ success: boolean; name: string }> {
    const {
      name,
      email,
      password,
      birthday,
      cpf,
      gender,
      phone,
      photo,
      patient,
      address,
      companyId,
    } = data;

    const user = new User({
      name,
      email,
      password,
      birthday,
      cpf,
      gender,
      phone,
      photo,
      companyId,
      address,
      // TODO: Check if user address is being created properly
      // address: {
      //   ...address,
      //   addressableType: "user",
      // },
      userType: UserType.PATIENT,
    });

    const patientEntity = new Patient({
      name: patient.name,
      companyId: patient.companyId,
      userId: patient.userId,
      ...(patient.fatherName ? { fatherName: patient.fatherName } : {}),
      motherName: patient.motherName,
      diagnosis: patient.diagnosis,
    });

    return await this.patientRepository.create({
      ...user.data,
      patient: patientEntity.data,
    });
  }
}
