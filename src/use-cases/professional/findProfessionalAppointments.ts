import { IProfessional } from "../../entities/Professional";
import { IProfessionalRepository } from "../../repositories/professionalRepository";

export class FindProfessionalAppointments {
  professionalRepository: IProfessionalRepository;

  constructor(professionalRepository: IProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }

  async execute(id: number): Promise<IProfessional | null> {
    return await this.professionalRepository.findOneWithAppointments(id);
  }
}
