export enum AddressableType {
  USER = "user",
  COMPANY = "company",
}

export interface IAddress {
  id?: string;
  addressableId?: string;
  companyId?: string;
  addressableType?: AddressableType;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  //TODO ========> Add complement
}

export class Address {
  data: IAddress;

  constructor(data: IAddress) {
    this.data = data;
  }
}
