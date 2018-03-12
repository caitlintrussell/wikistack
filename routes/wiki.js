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
  .then(function success(result){
    res.redirect(result.route);
  })
  // .catch(console.log('somethings wrong'));
});

router.get('/add', (req, res, next) => {
  res.render('../views/addpage.html')
})

router.get('/:urlTitle', (req, res, next)=>{
  models.Page.findAll({
    // attributes: ['urlTitle'],
    where: {urlTitle: req.params.urlTitle}
  })
  .then(foundPage => {
    res.render('../views/wikipage.html', {
      title: foundPage[0].dataValues.title,
      urlTitle: foundPage[0].dataValues.urlTitle,
      content: foundPage[0].dataValues.content
    })
    console.log('*******',foundPage);
  })
})


module.exports = router;
