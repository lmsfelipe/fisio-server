import { DataTypes } from "sequelize";
import sequelize from "./index";

const Address = sequelize.define(
  "address",
  {
    street: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    neighborhood: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);

export default Address;
