import "dotenv/config";

import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { ZodError } from "zod";

import sequelize from "../db/sequelize";
import { appointmentController } from "../../controllers/appointmentController";
import { patientController } from "../../controllers/patientController";
import { professionalController } from "../../controllers/professionalController";
import { userController } from "../../controllers/userController";
import { loginSchema } from "../zod/userSchema";
import { patientPayloadSchema } from "../zod/patientSchema";
// import { auth } from "../middlewares/auth";
import { professionalPayloadSchema } from "../zod/professionalSchema";
import { appointmentSchema } from "../zod/appointmentSchema";

const fastify = Fastify({
  logger: true,
});

// Add schema validator and serializer
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

// Zod error handler
fastify.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      issues: error.issues,
    });
    return;
  }

  reply.send(error);
});

/**
 * Routes
 */

// Patient
fastify.post(
  "/create-patient",
  { schema: { body: patientPayloadSchema } },
  patientController.createPatient
);
fastify.get("/find-patient/:id", patientController.findPatient);
fastify.get("/find-patient-address/:id", patientController.findCompletePatient);

// Professional
fastify.post(
  "/create-professional",
  { schema: { body: professionalPayloadSchema } },
  professionalController.createProfessional
);
fastify.get("/find-professional/:id", professionalController.findProfessional);
fastify.get(
  "/find-professional-appointments/:id",
  professionalController.findProfessionalAppointments
);
fastify.get(
  "/find-professionals-appointments",
  professionalController.findProfessionalsAppointments
);

// Appointment
fastify.post(
  "/create-appointment",
  { schema: { body: appointmentSchema } },
  appointmentController.createAppointment
);

// Login
fastify.post("/login", { schema: { body: loginSchema } }, userController.login);

/**
 * Start
 */
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(
      "====================Database synchronized===================="
    );
    fastify.listen(
      { port: 3000, host: "0.0.0.0" },
      (err: any, address: string) => {
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
