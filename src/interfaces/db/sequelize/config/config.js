require("dotenv/config");

const {
  PG_USERNAME = "myuser",
  PG_PASSWORD = "mypassword",
  PG_DATABASE = "mydatabase",
  PG_HOST = "host.docker.internal",
} = process.env;

module.exports = {
  development: {
    username: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    host: PG_HOST,
    dialect: "postgres",
  },
  test: {
    username: PG_USERNAME,
    password: "mypassword",
    database: "mydatabase",
    host: PG_HOST,
    dialect: "postgres",
  },
  production: {
    username: PG_USERNAME,
    password: "mypassword",
    database: "mydatabase",
    host: PG_HOST,
    dialect: "postgres",
  },
};
