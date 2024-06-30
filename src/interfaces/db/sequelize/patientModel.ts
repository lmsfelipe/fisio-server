import { DataTypes } from "sequelize";
import sequelize from "./index";

const Patient = sequelize.define(
  "patient",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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

export default Patient;
