export interface IProfessional {
  companyId: string;
  userId: string;
  name: string;
  specialization: "phisio" | "speech" | "secretary";
}

export class Professional {
  data: IProfessional;

  constructor(data: IProfessional) {
    this.data = data;
  }
}
