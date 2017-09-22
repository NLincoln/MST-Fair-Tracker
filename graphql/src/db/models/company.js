const { client, Sequelize } = require('../connection');

const Company = client.define('companies', {
  company_name: Sequelize.STRING,
  description: Sequelize.STRING,
  city: Sequelize.STRING,
})

module.exports = Company;