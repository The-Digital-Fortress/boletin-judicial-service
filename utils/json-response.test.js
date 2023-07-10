const {
  jsonResponse,
} = require('../utils/json-response');

test('json response should have a predefined structure', async () => {
  const response = new jsonResponse();

  const expected = {
    status: false,
    data: {},
    message: '',
    errors: [],
  };

  // Assert that response is a json object
  expect(typeof response).toBe('object');

  // Assert that the response is the same as the expected response
  expect(response).toMatchObject(expected);
});


test('json response should return a json object', async () => {
  const response = new jsonResponse(
    true,
    {},
    'OK',
    []
    );

  const expected = {
    status: true,
    data: {},
    message: 'OK',
    errors: [],
  };

  // Assert that response is a json object
  expect(typeof response).toBe('object');

  // Assert that the response is the same as the expected response
  expect(response).toMatchObject(expected);
});