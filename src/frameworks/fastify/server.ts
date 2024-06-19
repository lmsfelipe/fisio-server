import { patientController } from "../../controllers/patientController";
import sequelize from "../db/sequelize/index.js";

const fastify = require("fastify")({
  logger: true,
});

fastify.post("/create-patient", patientController.createPatient);
fastify.get("/find-patient/:id", patientController.findPatient);
fastify.get(
  "/find-patient-address/:id",
  patientController.findPatientWithAddress
);

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
