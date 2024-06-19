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

// fs.readdirSync(__dirname)
//   .filter((file: string) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
//     );
//   })
//   .forEach((file: any) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     console.log("Model =====> ", model);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

export default sequelize;
