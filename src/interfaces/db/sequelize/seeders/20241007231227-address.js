"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("addresses", [
      {
        id: "c321d2d9-dcbc-4303-9723-ae0c781c882a",
        companyId: "e30c0aac-9321-448f-80c3-e246d64aaab3",
        addressableType: "user",
        street: "R. Euclides da Maria",
        number: "264",
        neighborhood: "Pompeia",
        city: "Santos",
        state: "São Paulo",
        zipCode: "11065101",
        createdAt: "2024-10-03 23:35:44.777+00",
        updatedAt: "2024-10-03 23:35:44.777+00",
        addressableId: "e1a23486-b84c-4e67-ba87-8702ff6394da",
      },
      {
        id: "c92cfef3-7459-4d55-9144-81979a77b88a",
        companyId: "e30c0aac-9321-448f-80c3-e246d64aaab3",
        addressableType: "company",
        street: "Av Dois e Um",
        number: "132",
        neighborhood: "Jd. São Paulo",
        city: "São Paulo",
        state: "São Paulo",
        zipCode: "11075001",
        createdAt: "2024-10-03 23:35:44.78+00",
        updatedAt: "2024-10-03 23:35:44.78+00",
        addressableId: "e30c0aac-9321-448f-80c3-e246d64aaab3",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("addresses", null, {});
  },
};
