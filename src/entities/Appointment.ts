export interface IAppointment {
  dateTime: Date;
  duration: number;
  location: "clinic" | "home";
  patientId: string;
  professionalId: string;
  observation: string;
}

export class Appointment {
  data: IAppointment;

  constructor(data: IAppointment) {
    this.data = data;
  }
}
