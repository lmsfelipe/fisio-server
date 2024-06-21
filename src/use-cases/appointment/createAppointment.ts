import { IAppointment, Appointment } from "../../entities/Appointment";
import { IAppointmentRepository } from "../../repositories/appointmentRepository";

export class CreateAppointment {
  appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute(data: IAppointment): Promise<{ success: boolean }> {
    const {
      dateTime,
      duration,
      location,
      observation,
      patientID,
      professionalID,
    } = data;

    const appointment = new Appointment({
      dateTime,
      duration,
      location,
      observation,
      patientID,
      professionalID,
    });

    return await this.appointmentRepository.create(appointment.data);
  }
}
