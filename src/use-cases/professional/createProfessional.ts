import { Professional } from "../../entities/Professional";
import { User } from "../../entities/User";
import {
  IProfessionalPayload,
  IProfessionalRepository,
} from "../../repositories/professionalRepository";

export class CreateProfessional {
  professionalRepository: IProfessionalRepository;

  constructor(professionalRepository: IProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }

  async execute(
    data: IProfessionalPayload
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
      professional,
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
      address,
      userType: "professional",
    });

    const professionalPayload = new Professional({
      specialization: professional.specialization,
    });

    return await this.professionalRepository.create({
      ...user.data,
      professional: professionalPayload.data,
    });
  }
}
