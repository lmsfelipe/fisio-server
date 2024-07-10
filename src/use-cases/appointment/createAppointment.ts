import { IAppointment, Appointment } from "../../entities/Appointment";
import { IAppointmentRepository } from "../../repositories/appointmentRepository";

export class CreateAppointment {
  appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute(data: IAppointment): Promise<{ success: boolean }> {
    const {
      dateStart,
      dateEnd,
      location,
      observation,
      patientId,
      professionalId,
    } = data;

    const appointment = new Appointment({
      dateStart,
      dateEnd,
      location,
      observation,
      patientId,
      professionalId,
    });

    return await this.appointmentRepository.create(appointment.data);
  }
}
