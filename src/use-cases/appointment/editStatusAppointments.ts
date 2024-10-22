import { IAppointmentRepository } from "../../repositories/appointmentRepository";

export class EditStatusAppointment {
  appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(id: string, status: string): Promise<{ success: boolean }> {
    return this.appointmentRepository.editStatus(id, status);
  }
}
