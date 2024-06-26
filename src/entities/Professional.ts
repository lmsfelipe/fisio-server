import { User, IUser } from "./User";

export interface IProfessional {
  specialization: "phisio" | "speech" | "secretary";
}

export class Professional {
  data: IProfessional;

  constructor(data: IProfessional) {
    this.data = data;
  }
}
