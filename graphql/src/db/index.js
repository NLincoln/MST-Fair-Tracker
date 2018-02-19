const glob = require("glob");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
let db = {};
const sequelize = new Sequelize(
  "postgres://postgres:example@db:5432/postgres",
  {
    define: {
      timestamps: false,
      underscored: true
    }
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](
      path.join(__dirname, path.basename(file, ".js"))
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
