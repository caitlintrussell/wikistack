'use strict'

const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/', (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const page = models.Page.build({
    title,
    content,
  })

  page.save()
  .then(res.redirect('/') )
  // .catch(console.log('somethings wrong'));
});

router.get('/add', (req, res, next) => {
  res.render('../views/addpage.html')
})


module.exports = router;
