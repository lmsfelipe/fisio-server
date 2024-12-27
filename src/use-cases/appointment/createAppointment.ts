import { IAppointment, Appointment } from "../../entities/Appointment";
import { IAppointmentRepository } from "../../repositories/appointmentRepository";

export class CreateAppointment {
  appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(data: IAppointment): Promise<{ success: boolean }> {
    const {
      dateStart,
      dateEnd,
      location,
      observation,
      patientId,
      professionalId,
      companyId,
    } = data;

    const appointment = new Appointment({
      dateStart,
      dateEnd,
      location,
      observation,
      patientId,
      professionalId,
      companyId,
    });

    return this.appointmentRepository.create(appointment.data);
  }
}
