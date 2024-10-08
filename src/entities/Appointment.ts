export interface IAppointment {
  id?: number;
  dateStart: Date;
  dateEnd: Date;
  location: "clinic" | "home";
  patientId: string;
  professionalId: string;
  patientName?: string;
  professionalName?: string;
  observation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class Appointment {
  data: IAppointment;

  constructor(data: IAppointment) {
    this.data = data;
  }
}
