"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("companies", [
      {
        id: "e30c0aac-9321-448f-80c3-e246d64aaab3",
        companyName: "LMS",
        cnpj: "06.227.517/0001-02",
        logo: "NULL",
        createdAt: "2025-01-27 23:35:44.777+00",
        updatedAt: "2025-01-27 23:35:44.777+00",
      },
    ]);

    return queryInterface.bulkInsert("users", [
      {
        id: "e1a23486-b84c-4e67-ba87-8702ff6394da",
        companyId: "e30c0aac-9321-448f-80c3-e246d64aaab3",
        name: "Felipe Lima",
        email: "felipelms@gmail.com",
        password: "password",
        birthday: "1989-07-31",
        cpf: "35496839823",
        gender: "male",
        phone: "11997673298",
        photo: "NULL",
        userType: "owner",
        permission: "full",
        createdAt: "2025-01-27 23:35:44.777+00",
        updatedAt: "2025-01-27 23:35:44.777+00",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("companies", null, {});
  },
};
