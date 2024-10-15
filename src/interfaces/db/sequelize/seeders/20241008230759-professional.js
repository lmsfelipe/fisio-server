"use strict";

const {
  professionalsSeed,
  usersProfessionalSeed,
} = require("../../../../utils/seeders.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", usersProfessionalSeed);
    return queryInterface.bulkInsert("professionals", professionalsSeed);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("professionals", null, {});
  },
};
