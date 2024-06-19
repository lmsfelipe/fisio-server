import { User, IUser } from "./User";

export interface IPatient extends IUser {
  fatherName: string;
  motherName: string;
  diagnosis: string;
}

export class Patient extends User {
  data: IPatient;

  constructor(data: IPatient) {
    super(data);
    this.data = data;
  }
}
