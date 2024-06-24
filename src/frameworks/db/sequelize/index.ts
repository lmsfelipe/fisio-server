import { Sequelize } from "sequelize";
const env = process.env;

const database = env.PG_DATABASE || "mydatabase";
const username = env.PG_USERNAME || "myuser";
const password = env.PG_PASSWORD || "mypassword";
const host = env.PG_HOST || "host.docker.internal";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "postgres",
});

export default sequelize;
