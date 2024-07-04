import {
  IUserProfessional,
  IUserRepository,
} from "../../repositories/userRepository";

export class FindUserProfessional {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string): Promise<IUserProfessional | null> {
    return await this.userRepository.findOneProfessional(email);
  }
}
