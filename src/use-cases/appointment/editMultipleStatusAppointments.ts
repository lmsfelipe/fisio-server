import { IAppointmentRepository } from "../../repositories/appointmentRepository";

export class EditMultipleStatusAppointment {
  appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(status: string): Promise<{ success: boolean }> {
    return this.appointmentRepository.editMultipleStatus(status);
  }
}
