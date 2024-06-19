import { IPatient } from "./Patient";
import { IProfessional } from "./Professional";

export interface IPatientEvolution {
  id: number;
  date: Date;
  patient: IPatient;
  professional: IProfessional;
  evolutionText?: string;
  evolutionAudio?: File;
  evolutionVideo?: File;
}

export class PatientEvolution {
  props: IPatientEvolution;

  constructor(props: IPatientEvolution) {
    this.props = props;
  }
}
