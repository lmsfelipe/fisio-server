import { AddressableType, IAddress } from "./Address";
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
  companyId?: string;
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
  patients?: IPatient;
  professionals?: IProfessional;
}

export class User {
  data: IUser;

  constructor(data: IUser) {
    this.data = data;
  }

  setAddressableType() {
    this.data.address.addressableType = AddressableType.USER;
  }

  setUserType(userType: UserType) {
    this.data.userType = userType;
  }

  setPermission(permission: Permission) {
    this.data.permission = permission;
  }
}
