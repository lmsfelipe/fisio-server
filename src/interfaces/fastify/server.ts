import "dotenv/config";

import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { ZodError } from "zod";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";

import sequelize from "../db/sequelize";
import { appointmentController } from "../../controllers/appointmentController";
import { patientController } from "../../controllers/patientController";
import { professionalController } from "../../controllers/professionalController";
import { userController } from "../../controllers/userController";
import { loginSchema } from "../zod/userSchema";
import { patientPayloadSchema } from "../zod/patientSchema";
import { auth } from "../middlewares/auth";
import { professionalPayloadSchema } from "../zod/professionalSchema";
import {
  appointmentSchema,
  appointmentStatusSchema,
  deleteappointmentSchema,
} from "../zod/appointmentSchema";
import { companyPayloadSchema } from "../zod/companySchema";
import { companyController } from "../../controllers/companyConroller";
import { closeAppointmentsJob } from "../cron";

const fastify = Fastify({
  logger: true,
});

// Middlewares
fastify.register(fastifyHelmet);
fastify.register(fastifyCors);

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
  { schema: { body: patientPayloadSchema }, preHandler: [auth] },
  patientController.createPatient
);
fastify.get(
  "/find-patients/:companyId",
  { preHandler: [auth] },
  patientController.findPatients
);
fastify.get(
  "/find-patient-address/:id",
  { preHandler: [auth] },
  patientController.findCompletePatient
);

// Professional
fastify.post(
  "/create-professional",
  { schema: { body: professionalPayloadSchema }, preHandler: [auth] },
  professionalController.createProfessional
);
fastify.get(
  "/find-professionals/:companyId",
  { preHandler: [auth] },
  professionalController.findProfessionals
);
fastify.get(
  "/find-professional-appointments/:id",
  { preHandler: [auth] },
  professionalController.findProfessionalAppointments
);
fastify.get(
  "/find-professionals-appointments",
  { preHandler: [auth] },
  professionalController.findProfessionalsAppointments
);

// Company
fastify.post(
  "/create-company",
  { schema: { body: companyPayloadSchema } },
  companyController.createCompany
);

fastify.get("/find-company", companyController.findCompany);

// Appointment
fastify.post(
  "/create-appointment",
  { schema: { body: appointmentSchema }, preHandler: [auth] },
  appointmentController.createAppointment
);

fastify.put(
  "/edit-appointment",
  { schema: { body: appointmentSchema }, preHandler: [auth] },
  appointmentController.editAppointment
);

fastify.delete(
  "/delete-appointment",
  { schema: { body: deleteappointmentSchema }, preHandler: [auth] },
  appointmentController.deleteAppointment
);

fastify.put(
  "/edit-status-appointment",
  { schema: { body: appointmentStatusSchema }, preHandler: [auth] },
  appointmentController.editStatusAppointment
);

// User
fastify.post("/login", { schema: { body: loginSchema } }, userController.login);
fastify.get("/find-user", { preHandler: [auth] }, userController.findUser);
fastify.get(
  "/find-user-professional/:email",
  { preHandler: [auth] },
  userController.findUserProfessional
);

/**
 * Start
 */
const port = process.env.PORT || "8080";
const host = process.env.HOST || "0.0.0.0";

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(
      "====================Database synchronized===================="
    );
    fastify.listen(
      { port: parseInt(port, 10), host },
      (err: any, address: string) => {
        if (err) throw err;
        closeAppointmentsJob.start();
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
