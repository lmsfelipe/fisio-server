import { IProfessional, Professional } from "../../entities/Professional";
import { IProfessionalRepository } from "../../repositories/professionalRepository";

export class CreateProfessional {
  professionalRepository: IProfessionalRepository;

  constructor(professionalRepository: IProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }

  async execute(
    data: IProfessional
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
      address,
      specialization,
    } = data;

    const professional = new Professional({
      name,
      email,
      password,
      birthday,
      cpf,
      gender,
      phone,
      photo,
      address,
      specialization,
    });

    return await this.professionalRepository.create(professional.data);
  }
}
