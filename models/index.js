const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');


const Page = Sequelize.define('page', {
  title: {
    type: Sequelize.STRING,
  },
  urlTitle: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
});

const User = Sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize,
  },
}

module.exports = {
  Page: page,
  User: user,
}
