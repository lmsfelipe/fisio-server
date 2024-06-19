import { IPatient } from "../../entities/Patient";
import { IPatientRepository } from "../../repositories/patientRepository";

export class FindPatient {
  patientRepository: IPatientRepository;

  constructor(patientRepository: IPatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(id: number): Promise<IPatient | null> {
    return await this.patientRepository.findOne(id);
  }
}
