"use strict";

const {
  patientsSeed,
  usersPatientSeed,
} = require("../../../../utils/seeders.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", usersPatientSeed);
    return queryInterface.bulkInsert("patients", patientsSeed);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("patients", null, {});
  },
};
