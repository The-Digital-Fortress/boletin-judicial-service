const { formatDate, createURL } = require('./boletin');

test('formatDate should return a formatted date object', () => {

  const date = new Date('2021/12/01');
  const formattedDate = formatDate(date);

  const expected = {
    datetime: '2021/12/01 00:00:00',
    year: '2021',
    formattedDate: '211201',
  };

  expect(formattedDate).toMatchObject(expected);
} );

test('createURL should return a formatted URL', () => {
  
    const date = new Date('2021/12/01');
    const formattedDate = formatDate(date);
    const municipality = 'tj';
  
    const URL = createURL(formattedDate, municipality);
  
    const expected = 'http://www.pjbc.gob.mx/boletinj/2021/my_html/tj211201.htm';
  
    expect(URL).toMatch(expected);
  }
);