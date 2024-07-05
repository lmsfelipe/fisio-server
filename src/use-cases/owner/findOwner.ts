import {
  IOwnerPayload,
  IOwnerRepository,
} from "../../repositories/ownerRepository";

export class FindOwner {
  ownerRepository: IOwnerRepository;

  constructor(ownerRepository: IOwnerRepository) {
    this.ownerRepository = ownerRepository;
  }

  async execute(id: string): Promise<IOwnerPayload | null> {
    return await this.ownerRepository.findOne(id);
  }
}
