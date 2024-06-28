import { IUser } from "../../entities/User";
import { IUserRepository } from "../../repositories/userRepository";

export class FindUser {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string): Promise<IUser | null> {
    return await this.userRepository.findOne(email);
  }
}
