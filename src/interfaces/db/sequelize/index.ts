// TODO: Refactor to consume env variables

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(process.cwd() + "/config/config.json")[env];

let sequelize: typeof Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

export default sequelize;
