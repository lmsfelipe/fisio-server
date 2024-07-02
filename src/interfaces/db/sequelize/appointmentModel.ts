import { DataTypes } from "sequelize";

import sequelize from "./index";
import Professional from "./professionalModel";
import Patient from "./patientModel";

const Appointment = sequelize.define(
  "appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.ENUM("clinic", "home"),
      allowNull: false,
    },
    observation: {
      type: DataTypes.STRING,
    },
  },
  {}
);

Appointment.belongsTo(Professional);
Appointment.belongsTo(Patient);

Professional.hasMany(Appointment);
Patient.hasMany(Appointment);

export default Appointment;
