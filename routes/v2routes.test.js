const express = require('express');
const app = express();
const indexRouter = require('./v2routes');
const request = require('supertest');
const XlsxPopulate = require('xlsx-populate');
const { jsonResponse } = require('../utils/json-response');

app.use('/', indexRouter);

test('index should return Express', async () => {
  const response = await request(app).get('/');
  const expected = new jsonResponse(
    200,
    {},
    'Welcome to express',
    []
    );

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(expected);
});

test('healthcheck should return OK', async () => {
  const response = await request(app).get('/healthcheck');
  const expected = new jsonResponse(
    200,
    {},
    'OK',
    []
    );
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(expected);
});

test('sync user files with firebase', async () => {
  const response = await request(app).post('/sync');
  const expected = new jsonResponse(
    200,
    {},
    'OK',
    []
    );
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(expected);
});