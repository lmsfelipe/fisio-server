export enum Specialization {
  PHISIO = "phisio",
  SPEECH = "speech",
  SECRETARY = "secretary",
}

export interface IProfessional {
  companyId?: string;
  userId?: string;
  name: string;
  specialization: Specialization;
}

export class Professional {
  data: IProfessional;

  constructor(data: IProfessional) {
    this.data = data;
  }
}
