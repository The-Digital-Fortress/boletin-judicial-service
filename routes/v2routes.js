const express = require('express');
const router = express.Router();

const {
  jsonResponse,
} = require('../utils/json-response');

/* GET home page. */
router.get('/', function(req, res, next) {
  const response = new jsonResponse(
    200,
    {},
    'Not implemented yet',
    []
    );
  res.send(response);
});

module.exports = router;
