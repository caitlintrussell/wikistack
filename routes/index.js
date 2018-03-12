'use strict'

const express = require('express');
const router = express.Router();
const models = require('../models');
const wikiRouter = require('./wiki');
const userRouter = require('./user');


router.use('/wiki', wikiRouter);
router.use('/user', userRouter);
router.get('/', (req, res, next) => {
  res.render('../views/index.html');
})


module.exports = router;
