import { DataTypes } from "sequelize";

import sequelize from "./index";
import Patient from "./patientModel";
import Professional from "./professionalModel";
import Address from "./addressModel";
import Owner from "./ownerModel";

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
      // unique: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    photo: {
      type: DataTypes.BLOB,
    },
    userType: {
      type: DataTypes.ENUM("patient", "professional", "owner"),
      allowNull: false,
    },
    permission: {
      type: DataTypes.ENUM("view", "edit", "full"),
      defaultValue: "view",
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

User.hasOne(Owner);
Owner.belongsTo(User);

export default User;
