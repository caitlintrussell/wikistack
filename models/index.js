const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const generateUrlTitle = title => {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
},
  {
    getterMethods: {
    route: function(){
      return '/wiki/' + this.urlTitle;
    }
  }
}
// {
//   hooks: {
//     beforeValidate: (page, options) => {
//       page.urlTitle = generateUrlTitle(page.title);
//     }
//   },
// }
);
Page.hook('beforeValidate', (page, options) => {
  const pageTitle = generateUrlTitle(page.title);
  console.log('page title', pageTitle);
  page.urlTitle = pageTitle;
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      isEmail: true,
    }
  },
});

module.exports = {
  db: db,
  Page: Page,
  User: User,
}
