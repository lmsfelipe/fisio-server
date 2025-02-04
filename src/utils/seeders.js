const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");

const SEED_SIZE = 100;
const COMPANY_ID = "e30c0aac-9321-448f-80c3-e246d64aaab3";

// Users
function userData(userType) {
  const users = [];

  // Generate 100 users with the same companyId
  for (let i = 0; i < SEED_SIZE; i++) {
    users.push({
      id: uuidv4(),
      companyId: COMPANY_ID,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthday: "1960-05-07",
      cpf: faker.string.numeric(11),
      gender: "female",
      phone: faker.string.numeric(11),
      photo: "NULL",
      userType: userType,
      permission: "view",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return users;
}

const usersPatientSeed = userData("patient");
const usersProfessionalSeed = userData("professional");

// Patients
function patientsData() {
  const patients = [];

  // Generate x patients with the same companyId
  for (let i = 0; i < SEED_SIZE; i++) {
    patients.push({
      id: uuidv4(), // Generate a unique UUID for each patient
      companyId: COMPANY_ID, // The companyId provided
      userId: usersPatientSeed[i].id,
      name: faker.person.fullName(), // Generate a random name
      motherName: faker.person.fullName(), // Generate a random mother’s name
      fatherName: faker.person.fullName(), // Generate a random father’s name
      diagnosis: faker.lorem.sentence(), // Generate a random diagnosis
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return patients;
}

const patientsSeed = patientsData();

// Professional
function professionalsData() {
  const professionals = [];

  for (let i = 0; i < SEED_SIZE; i++) {
    professionals.push({
      id: uuidv4(),
      companyId: COMPANY_ID,
      userId: usersProfessionalSeed[i].id,
      name: faker.person.fullName(),
      specialization: "phisio",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return professionals;
}

const professionalsSeed = professionalsData();

module.exports = {
  usersPatientSeed,
  usersProfessionalSeed,
  patientsSeed,
  professionalsSeed,
};
