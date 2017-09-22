const { client, Sequelize } = require('../connection');

const columnDef = {
  type: Sequelize.BOOLEAN,
  allowNull: false,
  defaultValue: false,
}

const Company = client.define('companies', {
  company_name: Sequelize.STRING,
  description: Sequelize.STRING,
  city: Sequelize.STRING,

  is_liked: columnDef,
  is_disliked: columnDef,
  is_favorited: columnDef,
});

Company.sync({ force: true })

module.exports = Company;
