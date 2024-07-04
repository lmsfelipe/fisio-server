export interface IProfessional {
  name: string;
  ownerId: string;
  specialization: "phisio" | "speech" | "secretary";
}

export class Professional {
  data: IProfessional;

  constructor(data: IProfessional) {
    this.data = data;
  }
}
