import { User, IUser } from "./User";

export interface IProfessional extends IUser {
  registerNumber: number;
}

export class Professional extends User {
  props: IProfessional;

  constructor(props: IProfessional) {
    super(props);
    this.props = props;
  }
}
