'use strict'

const express = require('express');
const app = express();
const router = require('./routes');
const path = require('path');

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


db.sync({ force: true })
  .then(() => {
    const PORT = 1337;
    app.listen(PORT, () => console.log(`server awaiting requests on ${PORT}`));
})

