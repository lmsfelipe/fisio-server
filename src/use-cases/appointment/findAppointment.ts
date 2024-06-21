import { IAppointment } from "../../entities/Appointment";
import { IAppointmentRepository } from "../../repositories/appointmentRepository";

export class FindAppointment {
  appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute(id: number): Promise<IAppointment | null> {
    return await this.appointmentRepository.findOne(id);
  }
}
