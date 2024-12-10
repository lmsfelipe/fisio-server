import { Owner } from "../../entities/Owner";
import { Permission, User, UserType } from "../../entities/User";
import {
  IOwnerPayload,
  IOwnerRepository,
} from "../../repositories/ownerRepository";

export class CreateOwner {
  ownerRepository: IOwnerRepository;

  constructor(ownerRepository: IOwnerRepository) {
    this.ownerRepository = ownerRepository;
  }

  async execute(
    data: IOwnerPayload
  ): Promise<{ success: boolean; id: string }> {
    const {
      name,
      email,
      password,
      birthday,
      cpf,
      gender,
      phone,
      photo,
      owner,
      address,
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
      userType: UserType.OWNER,
      permission: Permission.FULL,
    });

    const ownerEntity = new Owner({
      name,
      address: owner.address,
      cnpj: owner.cnpj,
      companyName: owner.companyName,
    });

    return await this.ownerRepository.create({
      ...user.data,
      owner: ownerEntity.data,
    });
  }
}
