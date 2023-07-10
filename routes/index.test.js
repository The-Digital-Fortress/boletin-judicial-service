const express = require('express');
const app = express();
const indexRouter = require('./index');
const request = require('supertest');
const XlsxPopulate = require('xlsx-populate');

const {
  jsonResponse,
} = require('../utils/json-response');
const e = require('express');

app.use('/', indexRouter);

test('healthcheck should return OK', async () => {
  const response = await request(app).get('/healthcheck');
  const expected = new jsonResponse(
    true,
    {},
    'OK',
    []
    );
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(expected);
});

test('index should return Express', async () => {
  const response = await request(app).get('/');
  const expected = new jsonResponse(
    true,
    {},
    'Welcome to express',
    []
    );

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(expected);
});

test('file upload should return a json object', async () => {
  const fileContent = [
    [' 1 civil', ' 1111/2023'],
    ['2 civil ', '2222/2023 '],
    ['3 civil  ', ' 3333/2023 '],
    ['4 civil ', ' 4444/2023'],
    ['5 civil', ''],
    ['', '9999/2023   '],
  ];
  const file = await XlsxPopulate.fromBlankAsync();
  const sheet = file.sheet(0);
  sheet.cell('A1').value(fileContent[0][0]);
  sheet.cell('B1').value(fileContent[0][1]);
  sheet.cell('A2').value(fileContent[1][0]);
  sheet.cell('B2').value(fileContent[1][1]);
  sheet.cell('A3').value(fileContent[2][0]);
  sheet.cell('B3').value(fileContent[2][1]);
  sheet.cell('A4').value(fileContent[3][0]);
  sheet.cell('B4').value(fileContent[3][1]);
  sheet.cell('A5').value(fileContent[4][0]);
  sheet.cell('B5').value(fileContent[4][1]);
  sheet.cell('A6').value(fileContent[5][0]);
  sheet.cell('B6').value(fileContent[5][1]);
  const fileBuffer = await file.outputAsync();

  const response = await request(app).post('/file').attach('xlsxFile', fileBuffer, 'test.xlsx');
  expect(response.status).toBe(200);
  const expected = new jsonResponse(
    true,
    {
      zeroPaddedColumns: [
        [ '1civil', '01111/2023' ],
        [ '2civil', '02222/2023' ],
        [ '3civil', '03333/2023' ],
        [ '4civil', '04444/2023' ],
        [ '', '09999/2023' ]
      ]
    },
    'File uploaded successfully',
    []
    );
  expect(response.body).toMatchObject(expected);
});

test('file upload should return error if file is not xlsx', async () => {
  const response = await request(app).post('/file');
  
  const expected = new jsonResponse(
    false,
    {},
    'Error uploading file',
    ["Cannot read properties of undefined (reading 'buffer')"]
    );
  expect(response.status).toBe(400);
  expect(response.body).toMatchObject(expected)});