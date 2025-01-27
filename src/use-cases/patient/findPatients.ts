import { IPatient } from "../../entities/Patient";
import { IPatientRepository } from "../../repositories/patientRepository";

export class FindPatients {
  patientRepository: IPatientRepository;

  constructor(patientRepository: IPatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(companyId: string): Promise<IPatient[] | null> {
    return await this.patientRepository.findAll(companyId);
  }
}
