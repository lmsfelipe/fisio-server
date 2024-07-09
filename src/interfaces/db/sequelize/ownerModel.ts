import { DataTypes } from "sequelize";

import sequelize from "./index";
import Professional from "./professionalModel";
import Patient from "./patientModel";
import Address from "./addressModel";

const Owner = sequelize.define(
  "owner",
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
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

Owner.hasMany(Professional);
Professional.belongsTo(Owner);

Owner.hasMany(Patient);
Patient.belongsTo(Owner);

Owner.hasOne(Address, {
  foreignKey: "addressableId",
  constraints: false,
  scope: {
    addressableType: "company",
  },
});
Address.belongsTo(Owner, {
  foreignKey: "addressableId",
  constraints: false,
});

export default Owner;
