import { DataTypes } from "sequelize";

import sequelize from "../index";
import Professional from "./professionalModel";
import Patient from "./patientModel";
import { LocationEnum, StatusEnum } from "../../../../entities/Appointment";

const Appointment = sequelize.define(
  "appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    patientName: {
      type: DataTypes.STRING,
    },
    professionalName: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.ENUM(LocationEnum.CLINIC, LocationEnum.HOME),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        StatusEnum.OPENED,
        StatusEnum.CLOSED,
        StatusEnum.MISSED,
        StatusEnum.CANCELED
      ),
      defaultValue: StatusEnum.OPENED,
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
