export enum LocationEnum {
  CLINIC = "clinic",
  HOME = "home",
}

export enum StatusEnum {
  OPENED = "opened",
  CLOSED = "closed",
  MISSED = "missed",
  CANCELED = "canceled",
}

export interface IAppointment {
  id?: number;
  dateStart: Date;
  dateEnd: Date;
  location: LocationEnum;
  status?: StatusEnum;
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
