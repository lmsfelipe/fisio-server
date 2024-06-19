import { IAddress } from "./Address";

export interface IUser {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  cpf: number;
  gender: "masculino" | "feminino" | "outros";
  phone: number;
  photo: File;
  address: IAddress;
}

export class User {
  data: IUser;

  constructor(data: IUser) {
    this.data = data;
  }
}
