"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: "e1a23486-b84c-4e67-ba87-8702ff6394da",
        name: "Claudia",
        email: "claudia@gmail.com",
        password: "password",
        birthday: "1960-05-07",
        cpf: "35496839823",
        gender: "female",
        phone: "11997673298",
        photo: "NULL",
        userType: "owner",
        permission: "full",
        createdAt: "2024-10-03 23:35:44.772+00",
        updatedAt: "2024-10-03 23:35:44.772+00",
      },
    ]);

    return queryInterface.bulkInsert("owners", [
      {
        id: "e30c0aac-9321-448f-80c3-e246d64aaab3",
        name: "Claudia",
        companyName: "CAT",
        cnpj: "06.227.517/0001-02",
        createdAt: "2024-10-03 23:35:44.777+00",
        updatedAt: "2024-10-03 23:35:44.777+00",
        userId: "e1a23486-b84c-4e67-ba87-8702ff6394da",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("owners", null, {});
  },
};
