import { DataTypes } from "sequelize";
import sequelize from "./index";

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
    patientID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    professionalID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    observation: {
      type: DataTypes.STRING,
    },
  },
  {}
);

export default Appointment;
