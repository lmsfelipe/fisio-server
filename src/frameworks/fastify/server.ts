import { appointmentController } from "../../controllers/appointmentController";
import { patientController } from "../../controllers/patientController";
import { professionalController } from "../../controllers/professionalController";
import sequelize from "../db/sequelize/index.js";

const fastify = require("fastify")({
  logger: true,
});

// Patient
fastify.post("/create-patient", patientController.createPatient);
fastify.get("/find-patient/:id", patientController.findPatient);
fastify.get(
  "/find-patient-address/:id",
  patientController.findPatientWithAddress
);

// Professional
fastify.post("/create-professional", professionalController.createProfessional);
fastify.get("/find-professional/:id", professionalController.findProfessional);

// Appointment
fastify.post("/create-appointment", appointmentController.createAppointment);

// Sync database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(
      "====================Database synchronized===================="
    );
    fastify.listen(
      { port: 3000, host: "0.0.0.0" },
      (err: any, address: any) => {
        if (err) throw err;
        console.log(
          `==========Server is now listening on ${address}==============`
        );
      }
    );
  })
  .catch((err: any) => {
    console.error(
      ">>>>>>>>>>>>>>>>Error synchronizing database:<<<<<<<<<<<<<<<<<<",
      err
    );
  });
