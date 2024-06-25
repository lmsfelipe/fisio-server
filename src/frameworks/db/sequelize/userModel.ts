import { DataTypes } from "sequelize";

import sequelize from "./index";
import Patient from "./patientModel";
import Professional from "./professionalModel";
import Address from "./addressModel";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("masculino", "feminino", "outros"),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    userType: {
      type: DataTypes.ENUM("patient", "professional", "secretary"),
      allowNull: false,
    },
    permission: {
      type: DataTypes.ENUM("view", "edit", "admin"),
      defaultValue: "view",
    },
  },
  {}
);

User.hasOne(Patient);
Patient.belongsTo(User);

User.hasOne(Professional);
Professional.belongsTo(User);

User.hasOne(Address);
Address.belongsTo(User);

export default User;
