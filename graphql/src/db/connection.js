const Sequelize = require('sequelize');

const client = new Sequelize('postgres', 'postgres', 'example', {
  host: 'db',
  port: 5432,
  dialect: 'postgres',
  benchmark: true,
  define: {
    timestamps: false,
    underscored: true
  }
});

module.exports = {
  sequelize: client,
  client,
  Sequelize
};
