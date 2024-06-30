import { DataTypes } from "sequelize";
import sequelize from "./index";

const Professional = sequelize.define(
  "professional",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    specialization: {
      type: DataTypes.ENUM("phisio", "speech"),
    },
  },
  {}
);

export default Professional;
