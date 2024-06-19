export interface IAppointment {
  patientID: number;
  professtionalID: number;
  date: Date;
  startHour: Date;
  duration: number;
  repeat: boolean;
  observation: string;
}

export class Appointment {
  props: IAppointment;

  constructor(props: IAppointment) {
    this.props = props;
  }
}
