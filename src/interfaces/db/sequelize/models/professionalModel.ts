import { DataTypes } from "sequelize";
import sequelize from "../index";
import { Specialization } from "../../../../entities/Professional";

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
      type: DataTypes.ENUM(
        Specialization.PHISIO,
        Specialization.SECRETARY,
        Specialization.SPEECH
      ),
      allowNull: false,
    },
  },
  {}
);

export default Professional;
