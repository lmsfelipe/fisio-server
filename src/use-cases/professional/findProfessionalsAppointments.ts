import {
  IProfessionalRepository,
  IProfessionalWithAppointment,
} from "../../repositories/professionalRepository";

export class FindProfessionalsAppointments {
  professionalRepository: IProfessionalRepository;

  constructor(professionalRepository: IProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }

  async execute(date: string): Promise<IProfessionalWithAppointment[] | []> {
    return this.professionalRepository.findAllWithAppointments(date);
  }
}
