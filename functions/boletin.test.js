const { formatDate, createURL, getBoletinData } = require('./boletin');
const dummyResponse = require('../utils/constants');
require('jest-fetch-mock').enableMocks();

test('formatDate should return a formatted date object', () => {

  const date = new Date('2021/12/01');
  const formattedDate = formatDate(date);

  const expected = {
    datetime: '2021/12/01 00:00:00',
    year: '2021',
    formattedDate: '211201',
  };

  expect(formattedDate).toMatchObject(expected);
});

test('createURL should return a formatted URL', () => {

  const date = new Date('2021/12/01');
  const formattedDate = formatDate(date);
  const municipality = 'tj';

  const URL = createURL(formattedDate, municipality);

  const expected = 'http://www.pjbc.gob.mx/boletinj/2021/my_html/tj211201.htm';

  expect(URL).toMatch(expected);
}
);


describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  })

  test('getBoletinData should return the entries formatted', async () => {
    fetch.mockResponseOnce(dummyResponse);

    const date = new Date('2023/07/10');
    const formattedDate = formatDate(date);
    const municipality = 'ti';
    const URL = createURL(formattedDate, municipality);

    const boletinData = await getBoletinData(URL);

    const expected = [
        {
          "files": [
            { "0": "1", "1": "00840/2012", "2": "-- CI BANCO SOCIEDAD ANONIMA, INSTITUCION DE BANCA MULTIPLE -- VS SECRETO. SUMARIO HIPOTECARIO" },
            { "0": "2", "1": "00852/2013", "2": "HIPOTECARIA NACIONAL, SOCIEDAD ANONIMA DE CAPITAL VARIABLE, SOCIEDAD FINANCIERA DE OBJETO MÚLTIPLE, ENTIDAD REGULADA, GRUPO FINANCIERO BBVA BANCOMER VS SECRETO. SUMARIO HIPOTECARIO" }
          ],
          "key": "JUZGADO SEPTIMO CIVIL DE TIJUANA, B.C. 06 DE JULIO DE 2023"
        }
      ]

    expect(boletinData).toMatchObject(expected);
  })

  test('getBoletinData should return an error if no main section is found', async () => {
    fetch.mockResponseOnce('<div></div>');

    const date = new Date('2023/07/10');
    const formattedDate = formatDate(date);
    const municipality = 'ti';
    const URL = createURL(formattedDate, municipality);

    const boletinData = await getBoletinData(URL);

    const expected = new Error('No main section found');

    expect(boletinData).toMatchObject(expected);
  });
});