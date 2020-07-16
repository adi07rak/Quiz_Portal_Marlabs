const express = require('express');
const router = express.Router();

const { getAllTechnology, getTopics } = require('../controllers/quiz.controller');

router.get('/getTechnology', getAllTechnology)
    .post('/getTopics', getTopics);

module.exports = router;