import { DataTypes } from "sequelize";
import sequelize from "../index";

const Patient = sequelize.define(
  "patient",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motherName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fatherName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

export default Patient;
