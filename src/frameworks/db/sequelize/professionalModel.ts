import { DataTypes } from "sequelize";
import sequelize from "./index";
import Address from "./addressModel";

const Professional = sequelize.define(
  "professional",
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
      type: DataTypes.STRING,
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
      type: DataTypes.ENUM("patient", "professional", "secretary", "admin"),
      defaultValue: "professional",
    },
    permission: {
      type: DataTypes.ENUM("view", "edit", "admin"),
      defaultValue: "view",
    },
    specialization: {
      type: DataTypes.ENUM("phisio", "speech"),
    },
  },
  {}
);

Professional.hasOne(Address);
Address.belongsTo(Professional);

export default Professional;
