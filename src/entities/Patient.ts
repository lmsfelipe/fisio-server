export interface IPatient {
  name: string;
  fatherName: string;
  motherName: string;
  diagnosis: string;
}

export class Patient {
  data: IPatient;

  constructor(data: IPatient) {
    this.data = data;
  }
}
