export class UpdateAddress {
  addressRepository;

  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute(id, data) {
    return await this.addressRepository.update(id, data);
  }
}
