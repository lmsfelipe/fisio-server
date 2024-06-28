import "dotenv/config";

import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import sequelize from "../db/sequelize";
import { appointmentController } from "../../controllers/appointmentController";
import { patientController } from "../../controllers/patientController";
import { professionalController } from "../../controllers/professionalController";
import { userController } from "../../controllers/userController";
import { loginSchema } from "../zod/userSchema";

const fastify = Fastify({
  logger: true,
});

// Add schema validator and serializer
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

// Patient
fastify.post("/create-patient", patientController.createPatient);
fastify.get("/find-patient/:id", patientController.findPatient);
fastify.get("/find-patient-address/:id", patientController.findCompletePatient);

// Professional
fastify.post("/create-professional", professionalController.createProfessional);
fastify.get("/find-professional/:id", professionalController.findProfessional);

// Appointment
fastify.post("/create-appointment", appointmentController.createAppointment);

// Login
fastify.post("/login", { schema: { body: loginSchema } }, userController.login);

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
