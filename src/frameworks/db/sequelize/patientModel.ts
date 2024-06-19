import { DataTypes } from "sequelize";
import sequelize from "./index";
import Address from "./addressModel";

const Patient = sequelize.define(
  "patient",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
      type: DataTypes.STRING(100),
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    userType: {
      type: DataTypes.ENUM("patient", "professional"),
      defaultValue: "patient",
    },
    motherName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fatherName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

Patient.hasOne(Address);
Address.belongsTo(Patient);

export default Patient;
