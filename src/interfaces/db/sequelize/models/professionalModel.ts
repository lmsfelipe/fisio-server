import { DataTypes } from "sequelize";
import sequelize from "../index";

const Professional = sequelize.define(
  "professional",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.ENUM("phisio", "speech", "secretary"),
      allowNull: false,
    },
  },
  {}
);

export default Professional;
