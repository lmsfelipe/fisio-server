import { IUser } from "../../entities/User";
import { IUserRepository } from "../../repositories/userRepository";

export class FindUser {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    identifier: string,
    value: string | number
  ): Promise<IUser | null> {
    return await this.userRepository.findOne(identifier, value);
  }
}
