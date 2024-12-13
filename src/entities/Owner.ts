import { IAddress } from "./Address";
import { IPatient } from "./Patient";
import { IProfessional } from "./Professional";

export interface IOwner {
  id?: string;
  name: string;
  companyName: string;
  cnpj: string;
  address: IAddress;
  professionals?: IProfessional[];
  patients?: IPatient[];
}

export class Owner {
  data: IOwner;

  constructor(data: IOwner) {
    this.data = data;
  }
}
