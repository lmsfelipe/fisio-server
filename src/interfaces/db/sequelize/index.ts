require("dotenv/config");
const Sequelize = require("sequelize");

const {
  PG_USERNAME = "myuser",
  PG_PASSWORD = "mypassword",
  PG_DATABASE = "mydatabase",
  PG_HOST = "host.docker.internal",
} = process.env;

const sequelize = new Sequelize(PG_DATABASE, PG_USERNAME, PG_PASSWORD, {
  host: PG_HOST,
  dialect: "postgres",
});

export default sequelize;
