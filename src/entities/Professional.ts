export interface IProfessional {
  name: string;
  specialization: "phisio" | "speech" | "secretary";
}

export class Professional {
  data: IProfessional;

  constructor(data: IProfessional) {
    this.data = data;
  }
}
