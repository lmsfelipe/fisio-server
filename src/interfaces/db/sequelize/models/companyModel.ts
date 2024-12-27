import { DataTypes } from "sequelize";

import sequelize from "../index";
import Professional from "./professionalModel";
import Patient from "./patientModel";
import Address from "./addressModel";
import Appointment from "./appointmentModel";
import User from "./userModel";

const Company = sequelize.define(
  "company",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    logo: {
      type: DataTypes.BLOB,
    },
  },
  {}
);

Company.hasMany(Professional);
Professional.belongsTo(Company);

Company.hasMany(Patient);
Patient.belongsTo(Company);

Company.hasMany(Appointment);
Appointment.belongsTo(Company);

Company.hasMany(User);
User.belongsTo(Company);

Company.hasOne(Address, {
  foreignKey: "addressableId",
  constraints: false,
  scope: {
    addressableType: "company",
  },
});
Address.belongsTo(Company, {
  foreignKey: "addressableId",
  constraints: false,
});

export default Company;
