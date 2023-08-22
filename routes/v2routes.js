const db = require ('../utils/firebase/initializeFirebase');
const { getAllRecords } = require('../utils/firebase/firestoreFunctions');
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

router.get('/sync', async function(req, res, next) {
  const users = await getAllRecords(db, 'users');
  const response = new jsonResponse(
    200,
    {users},
    'OK',
    []
    );
  res.send(response);
});

module.exports = router;
