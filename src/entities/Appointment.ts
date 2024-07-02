export interface IAppointment {
  dateTime: Date;
  duration: number;
  location: "clinic" | "home";
  patientId: number;
  professionalId: number;
  observation: string;
}

export class Appointment {
  data: IAppointment;

  constructor(data: IAppointment) {
    this.data = data;
  }
}
