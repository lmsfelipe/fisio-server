import { IAddress } from "./Address";
import { IOwner } from "./Owner";
import { IPatient } from "./Patient";
import { IProfessional } from "./Professional";

export enum UserType {
  PATIENT = "patient",
  PROFESSIONAL = "professional",
  OWNER = "owner",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum Permission {
  VIEW = "view",
  EDIT = "edit",
  FULL = "full",
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  birthday: Date;
  cpf: string;
  gender: Gender;
  phone: string;
  photo?: File;
  address: IAddress;
  userType?: UserType;
  permission?: Permission;
  patient?: IPatient;
  professional?: IProfessional;
  owner?: IOwner;
}

export class User {
  data: IUser;

  constructor(data: IUser) {
    this.data = data;
  }
}
