const { client, Sequelize } = require('../../connection');

const Comments = client.define('companies_comments', {
  text: Sequelize.STRING,
}, {
  defaultScope: {
    order: [
      ['id', 'ASC']
    ]
  }
});

module.exports = Comments;
