const { client, Sequelize } = require('../connection');
const Comment = require('./company/comments');

const Company = client.define('companies', {
  company_name: Sequelize.STRING,
  description: Sequelize.STRING,
  city: Sequelize.STRING,

  is_liked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  is_disliked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  is_favorited: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  defaultScope: {
    order: [
      ['id', 'ASC']
    ]
  }
});

Company.hasMany(Comment, {
  foreignKey: 'company',
  sourceKey: 'id'
});

Comment.sync({ force: true });

module.exports = Company;
