"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        // unique: true,
      },
      gender: {
        type: Sequelize.ENUM("female", "male", "other"),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userType: {
        type: Sequelize.ENUM("owner", "patient", "professional"),
        allowNull: false,
      },
      permission: {
        type: Sequelize.ENUM("edit", "full", "view"),
        defaultValue: "view",
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
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  },
};
