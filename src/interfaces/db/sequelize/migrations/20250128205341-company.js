"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("companies", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true,
      },
      logo: {
        type: Sequelize.BLOB,
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable("companies");
  },
};
