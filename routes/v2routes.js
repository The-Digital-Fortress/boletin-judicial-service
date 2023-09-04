const express = require('express');
const router = express.Router();
const { searchUserFiles } = require('../utils/userFiles/userFunctions');

const {
  jsonResponse,
} = require('../utils/json-response');

/* GET home page. */
router.get('/', function(req, res, next) {
  const response = new jsonResponse(
    200,
    {},
    'Welcome to express',
    []
    );
  res.send(response);
});

router.get('/healthcheck', function(req, res, next) {
  const response = new jsonResponse(
    200,
    {},
    'OK',
    []
    );
  res.send(response);
});



router.post('/sync', async function(req, res, next) {
  const userid = req.body.userid;

  if(!userid){
    const response = new jsonResponse(
      400,
      {},
      'Missing userid',
      []
      );
    res.status(400);
    res.send(response);
    return;
  }

  const foundFiles = await searchUserFiles(userid);

  const response = new jsonResponse(
    200,
    {foundFiles},
    'OK',
    []
    );
  res.send(response);
});

module.exports = router;
