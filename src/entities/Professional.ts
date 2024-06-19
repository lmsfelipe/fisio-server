import { User, IUser } from "./User";

export interface IProfessional extends IUser {
  specialization: "phisio" | "speech";
}

export class Professional extends User {
  data: IProfessional;

  constructor(data: IProfessional) {
    super(data);
    this.data = data;
  }
}
