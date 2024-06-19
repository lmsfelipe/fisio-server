import { IPatient } from "./Patient";
import { IProfessional } from "./Professional";

type TEvaluationType = "x" | "y" | "z";

export interface IPatientEvaluation {
  id: number;
  date: Date;
  patient: IPatient;
  professional: IProfessional;
  evaluationType: TEvaluationType;
}

export class PatientEvaluation {
  props: IPatientEvaluation;

  constructor(props: IPatientEvaluation) {
    this.props = props;
  }
}
