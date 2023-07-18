const express = require('express');
const app = express();
const indexRouter = require('./v1routes');
const request = require('supertest');
const XlsxPopulate = require('xlsx-populate');
const dummyResponse = require('../utils/constants');

const {
  jsonResponse,
} = require('../utils/json-response');
const e = require('express');

app.use('/', indexRouter);

jest.mock('../functions/boletin');

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
    200,
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
    400,
    {},
    'Error uploading file',
    ["Cannot read properties of undefined (reading 'buffer')"]
    );
  expect(response.status).toBe(400);
  expect(response.body).toMatchObject(expected)});

  test('boletin should return a json object', async () => {
    
    // Mock the /boleting endpoint response from getBoletinData function
    const formatDate = require('../functions/boletin').formatDate;
    formatDate.mockReturnValue({ datetime: '2023/07/11 00:00:00', year: '2023', formattedDate: '230711' });
    const createURL = require('../functions/boletin').createURL;
    createURL.mockReturnValue('http://www.pjbc.gob.mx/boletinj/2023/my_html/ti230711.htm');
    const getBoletinData = require('../functions/boletin').getBoletinData;
    getBoletinData.mockResolvedValue([
      {
        "files": [
          { "0": "1", "1": "00840/2012", "2": "-- CI BANCO SOCIEDAD ANONIMA, INSTITUCION DE BANCA MULTIPLE -- VS SECRETO. SUMARIO HIPOTECARIO" },
          { "0": "2", "1": "00852/2013", "2": "HIPOTECARIA NACIONAL, SOCIEDAD ANONIMA DE CAPITAL VARIABLE, SOCIEDAD FINANCIERA DE OBJETO MÚLTIPLE, ENTIDAD REGULADA, GRUPO FINANCIERO BBVA BANCOMER VS SECRETO. SUMARIO HIPOTECARIO" }
        ],
        "key": "JUZGADO SEPTIMO CIVIL DE TIJUANA, B.C. 06 DE JULIO DE 2023"
      }
    ]);
    
    // request to /boletin with date query param
    const response = await request(app).get('/boletin').query({date: '2023-07-11', city: 'ti'});

    expect(response.status).toBe(200);
    expect(typeof response.body.data).toBe('object');
    expect(formatDate).toHaveBeenCalled();
    expect(createURL).toHaveBeenCalled();
    expect(getBoletinData).toHaveBeenCalled();
    expect(getBoletinData).toHaveBeenCalledTimes(1);
  });

  test('boletin should return error if date query param is missing', async () => {
    const response = await request(app).get('/boletin').query({city: 'ti'});
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(["Missing query parameters"]);
  });

  test('boletin should throw error if getBoletinData fails', async () => {
    const getBoletinData = require('../functions/boletin').getBoletinData;
    const originalBoletinModule = jest.requireActual('../functions/boletin');
    getBoletinData.mockImplementation(originalBoletinModule.getBoletinData);

    const response = await request(app).get('/boletin').query({date: '2023-07-15', city: 'ti'});
    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(["No main section found"]);
  });