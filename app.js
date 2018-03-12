'use strict'

const express = require('express');
const app = express();
const router = require('./routes');
const path = require('path');
const models = require('./models');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const nunjucks = require('nunjucks');


// all of the nunjucks set up stuff
const env = nunjucks.configure('views', { noCache: true }) // where to find the views, caching off
app.set('view engine', 'html') // what file extension do our templates have
app.engine('html', nunjucks.render) // how to render html templates

// set up the route for morgan
app.use(morgan('dev'))

// body parser translation stuff for rendering
app.use(bodyParser.urlencoded({ extended: true })) // for HTML form submits
app.use(bodyParser.json()) // would be for AJAX requests

app.use('/', router);

app.use(express.static(path.join(__dirname, '/public')));

// models.User.sync().then(function(){
//   console.log('User table created!');
//   return models.Page.sync()
// })
// .then(function(){
//   console.log('Page table created');
//   app.listen(5432, function(){
//     console.log('Server is listening on 5432');
//   })
// })
// .catch(console.error.bind(console));

// app.use('/', (err, res, req, next) => {
//   const error = new Error(err);
//   error.status = err.status || 500;
//   error.message = err.message || 'Internal Server Error';
// })


models.db.sync({ force: false })
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`server awaiting requests on ${PORT}`))

}).catch(console.error.bind(console));

