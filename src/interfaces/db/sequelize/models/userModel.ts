import { DataTypes } from "sequelize";

import sequelize from "../index";
import Patient from "./patientModel";
import Professional from "./professionalModel";
import Address from "./addressModel";
import { Gender, Permission, UserType } from "../../../../entities/User";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      // unique: true,
    },
    gender: {
      type: DataTypes.ENUM(Gender.FEMALE, Gender.MALE, Gender.OTHER),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    photo: {
      type: DataTypes.BLOB,
    },
    userType: {
      type: DataTypes.ENUM(
        UserType.OWNER,
        UserType.PATIENT,
        UserType.PROFESSIONAL
      ),
      allowNull: false,
    },
    permission: {
      type: DataTypes.ENUM(Permission.EDIT, Permission.FULL, Permission.VIEW),
      defaultValue: Permission.VIEW,
    },
  },
  {}
);

User.hasOne(Patient);
Patient.belongsTo(User);

User.hasOne(Professional);
Professional.belongsTo(User);

User.hasOne(Address, {
  foreignKey: "addressableId",
  constraints: false,
  scope: {
    addressableType: "user",
  },
});
Address.belongsTo(User, {
  foreignKey: "addressableId",
  constraints: false,
});

export default User;
