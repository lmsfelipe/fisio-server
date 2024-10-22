import { IAppointmentRepository } from "../../repositories/appointmentRepository";

export class DeleteAppointment {
  appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(id: number): Promise<{ success: boolean }> {
    return this.appointmentRepository.delete(id);
  }
}
