export enum LocationEnum {
  CLINIC = "clinic",
  HOME = "home",
}

export enum StatusEnum {
  OPENED = "opened",
  CLOSED = "closed",
  MISSED = "missed",
}

export interface IAppointment {
  id?: number;
  companyId: string;
  patientId: string;
  professionalId: string;
  dateStart: Date;
  dateEnd: Date;
  location: LocationEnum;
  status?: StatusEnum;
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
