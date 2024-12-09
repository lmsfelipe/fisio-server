import { Professional } from "../../entities/Professional";
import { User, UserType } from "../../entities/User";
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
      userType: UserType.PROFESSIONAL,
    });

    const professionalPayload = new Professional({
      name: professional.name,
      ownerId: professional.ownerId,
      specialization: professional.specialization,
    });

    return await this.professionalRepository.create({
      ...user.data,
      professional: professionalPayload.data,
    });
  }
}
