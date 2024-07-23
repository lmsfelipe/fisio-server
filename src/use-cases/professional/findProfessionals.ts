import { IProfessional } from "../../entities/Professional";
import { IProfessionalRepository } from "../../repositories/professionalRepository";

export class FindProfessionals {
  professionalRepository: IProfessionalRepository;

  constructor(professionalRepository: IProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }

  async execute(ownerId: number): Promise<IProfessional[] | null> {
    return await this.professionalRepository.findAll(ownerId);
  }
}
