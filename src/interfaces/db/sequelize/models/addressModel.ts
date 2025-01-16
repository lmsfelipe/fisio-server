import { DataTypes } from "sequelize";
import sequelize from "../index";
import { AddressableType } from "../../../../entities/Address";

const Address = sequelize.define(
  "address",
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
    addressableType: {
      type: DataTypes.ENUM(AddressableType.USER, AddressableType.COMPANY),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING(100),
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
