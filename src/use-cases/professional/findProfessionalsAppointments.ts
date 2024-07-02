import {
  IProfessionalRepository,
  IProfessionalWithAppointment,
} from "../../repositories/professionalRepository";

export class FindProfessionalsAppointments {
  professionalRepository: IProfessionalRepository;

  constructor(professionalRepository: IProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }

  async execute(): Promise<IProfessionalWithAppointment[] | []> {
    return this.professionalRepository.findAllWithAppointments();
  }
}
