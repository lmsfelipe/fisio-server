const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");

const SEED_SIZE = 100;

// Users
function userData(userType) {
  const users = [];

  // Generate 100 users with the same ownerId
  for (let i = 0; i < SEED_SIZE; i++) {
    users.push({
      id: uuidv4(),
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

  // Generate x patients with the same ownerId
  for (let i = 0; i < SEED_SIZE; i++) {
    patients.push({
      id: uuidv4(), // Generate a unique UUID for each patient
      ownerId: "e30c0aac-9321-448f-80c3-e246d64aaab3", // The ownerId provided
      name: faker.person.fullName(), // Generate a random name
      motherName: faker.person.fullName(), // Generate a random mother’s name
      fatherName: faker.person.fullName(), // Generate a random father’s name
      diagnosis: faker.lorem.sentence(), // Generate a random diagnosis
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: usersPatientSeed[i].id,
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
      ownerId: "e30c0aac-9321-448f-80c3-e246d64aaab3",
      name: faker.person.fullName(),
      specialization: "phisio",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: usersProfessionalSeed[i].id,
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
