export interface IAddress {
  addressableType?: "user" | "company";
  street: string;
  number: string;
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
