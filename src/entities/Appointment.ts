export interface IAppointment {
  dateStart: Date;
  dateEnd: Date;
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
