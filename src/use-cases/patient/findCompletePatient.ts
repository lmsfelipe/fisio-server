import {
  IPatientRepository,
  IPatientWithAddress,
} from "../../repositories/patientRepository";

export class FindCompletePatient {
  patientRepository: IPatientRepository;

  constructor(patientRepository: IPatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(id: number): Promise<IPatientWithAddress | null> {
    return await this.patientRepository.findCompletePatient(id);
  }
}
