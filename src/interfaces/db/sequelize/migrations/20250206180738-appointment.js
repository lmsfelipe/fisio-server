"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("appointments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      professionalId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      patientId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      dateStart: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dateEnd: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      patientName: {
        type: Sequelize.STRING,
      },
      professionalName: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.ENUM("clinic", "home"),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("opened", "closed", "missed"),
        defaultValue: "opened",
        allowNull: false,
      },
      observation: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("appointments");
  },
};
