import { IPatient, Patient } from "../../entities/Patient";
import { IPatientRepository } from "../../repositories/patientRepository";

export class CreatePatient {
  patientRepository: IPatientRepository;

  constructor(patientRepository: IPatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(data: IPatient): Promise<{ success: boolean; name: string }> {
    const {
      name,
      email,
      password,
      birthday,
      cpf,
      gender,
      phone,
      photo,
      fatherName,
      motherName,
      diagnosis,
      address,
    } = data;

    const patient = new Patient({
      name,
      email,
      password,
      birthday,
      cpf,
      gender,
      phone,
      photo,
      fatherName,
      motherName,
      diagnosis,
      address,
    });

    return await this.patientRepository.create(patient.data);
  }
}
