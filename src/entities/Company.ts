import { AddressableType, IAddress } from "./Address";
import { IPatient } from "./Patient";
import { IProfessional } from "./Professional";
import { IUser } from "./User";

export interface ICompany {
  id?: string;
  companyName: string;
  cnpj: string;
  address: IAddress;
  logo?: string;
  professionals?: IProfessional[];
  patients?: IPatient[];
  users?: IUser[];
}

export class Company {
  data: ICompany;

  constructor(data: ICompany) {
    this.data = data;
  }

  setAddressableType() {
    this.data.address.addressableType = AddressableType.COMPANY;
  }
}
