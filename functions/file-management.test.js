const { fileUpload,getExcelColumns,filterColumns, addZeroPaddingToIds } = require('./file-management');


test('fileUpload should return workingSheet object', async () => {
  // Create a mock file buffer for testing
  const fileBuffer = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

  // Call the function with the mock file buffer
  const result = await fileUpload(fileBuffer);

  // Assert that the result is an object (workingSheet)
  expect(typeof result).toBe('object');

  // Assert that the result has a property called A1
  expect(result.hasOwnProperty('A1')).toBe(true);

  // Assert that the result has a value of 'buffer' for the A1 property
  expect(result.A1.v).toBe('buffer');
});

test('getExcelColumns should return an array of arrays', async () => {
  // Create a mock workingSheet object for testing
  const workingSheet = { 
    A1: { t: 's', v: 'valueA1' }, '!ref':'A1', 
    B1: { t: 's', v: 'valueB1' }, '!ref':'B1',
    A2: { t: 's', v: 'valueA2' }, '!ref':'A2',
    B2: { t: 's', v: 'valueB2' }, '!ref':'B2',
  };

  // Call the function with the mock workingSheet object
  const result = await getExcelColumns(workingSheet);

  // Assert that the result is an array
  expect(Array.isArray(result)).toBe(true);

  // Assert that the result has a length of 2
  expect(result.length).toBe(2);

  // Assert that the result has a value of 'buffer1' for the first item in the first array and 'buffer4' for the second item in the first array
  expect(result[0][0]).toBe('valueB1');
  expect(result[1][0]).toBe('valueB2');
});

test('filterColumns should filter out empty columns and remove blanks', async () => {
  // Create a mock excelColumns array for testing
  const excelColumns = [
    [' 1 civil', ' 1111/2023'],
    ['2 civil ', '2222/2023 '],
    ['3 civil  ', ' 3333/2023 '],
    ['4 civil ', ' 4444/2023'],
    ['5 civil', ''],
    ['', '9999/2023   '],
  ];
  // Call the function with the mock excelColumns array
  const result = await filterColumns(excelColumns);

  // Assert that the result is an array
  expect(Array.isArray(result)).toBe(true);

  // Assert that the result has a length of 5
  expect(result.length).toBe(5);

  // Assert that the result values doesn't have any spaces
  expect(result[0][0]).toBe('1civil');
  expect(result[0][1]).toBe('1111/2023');
  expect(result[1][0]).toBe('2civil');
  expect(result[1][1]).toBe('2222/2023');
  expect(result[2][0]).toBe('3civil');
  expect(result[2][1]).toBe('3333/2023');
  expect(result[3][0]).toBe('4civil');
  expect(result[3][1]).toBe('4444/2023');
  expect(result[4][0]).toBe('');
  expect(result[4][1]).toBe('9999/2023');

  // Assert that an empty 2nd column of excelColumns array is not in result array
  expect(result[4][1]).not.toBe(excelColumns[4][1]);

});

test('addZeroPaddingToIds should add zero padding to IDs', async () => {

  // Create a mock filteredColumns array for testing
  const filteredColumns = [
    ['1civil', '1111/2023'],
    ['2civil', '2222/2023'],
    ['3civil', '3333/2023'],
    ['4civil', '4444/2023'],
    ['', '9999/2023'],
  ];
  // Call the function with the mock filteredColumns array
  const result = await addZeroPaddingToIds(filteredColumns);

  // Assert that the result is an array
  expect(Array.isArray(result)).toBe(true);

  // Assert that the result has a length of 5
  expect(result.length).toBe(5);

  // Assert that the result values have zero padding
  expect(result[0][0]).toBe('1civil');
  expect(result[0][1]).toBe('01111/2023');
  expect(result[1][0]).toBe('2civil');
  expect(result[1][1]).toBe('02222/2023');
  expect(result[2][0]).toBe('3civil');
  expect(result[2][1]).toBe('03333/2023');
  expect(result[3][0]).toBe('4civil');
  expect(result[3][1]).toBe('04444/2023');
  expect(result[4][0]).toBe('');
  expect(result[4][1]).toBe('09999/2023');
} );