import { IAppointment, Appointment } from "../../entities/Appointment";
import { IAppointmentRepository } from "../../repositories/appointmentRepository";

export class EditAppointment {
  appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(data: IAppointment): Promise<{ success: boolean }> {
    const {
      id,
      dateStart,
      dateEnd,
      location,
      observation,
      patientId,
      professionalId,
      companyId,
      status,
    } = data;

    const appointment = new Appointment({
      id,
      dateStart,
      dateEnd,
      location,
      observation,
      patientId,
      professionalId,
      companyId,
      status,
    });

    return this.appointmentRepository.edit(appointment.data);
  }
}
