import cron from "node-cron";
import { AppointmentRepository } from "../../repositories/appointmentRepository";
import { EditMultipleStatusAppointment } from "../../use-cases/appointment/editMultipleStatusAppointments";

const appointmentRepository = new AppointmentRepository();

export const closeAppointmentsJob = cron.schedule(
  "00 00 * * 1-5",
  async () => {
    const editMultipleStatusAppointment = new EditMultipleStatusAppointment(
      appointmentRepository
    );

    try {
      await editMultipleStatusAppointment.execute("closed");
      console.log("Succecss: Appointments closed");
    } catch (error) {
      console.log("Error: Not possible to close appointments");
    }
  },
  { timezone: "America/Sao_Paulo" }
);
