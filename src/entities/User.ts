import { IAddress } from "./Address";
import { IPatient } from "./Patient";
import { IProfessional } from "./Professional";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  birthday: Date;
  cpf: string;
  gender: "male" | "female" | "other";
  phone: string;
  photo?: File;
  address: IAddress;
  userType?: "patient" | "professional" | "admin";
  permission?: "view" | "edit" | "full";
  patient?: IPatient;
  professional?: IProfessional;
}

export class User {
  data: IUser;

  constructor(data: IUser) {
    this.data = data;
  }
}
