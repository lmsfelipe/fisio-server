import { Owner } from "../../entities/Owner";
import { User } from "../../entities/User";
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
      userType: "owner",
      permission: "full",
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
