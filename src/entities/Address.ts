export interface IAddress {
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export class Address {
  data: IAddress;

  constructor(data: IAddress) {
    this.data = data;
  }
}
