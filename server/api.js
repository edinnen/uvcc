const express = require('express');
const router = express.Router();

const api = require('./queries');

router.get('/insta', api.getInsta);

module.exports = router;
