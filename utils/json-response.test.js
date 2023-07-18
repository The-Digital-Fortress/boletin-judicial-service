const {
  jsonResponse,
} = require('../utils/json-response');

test('json response should have a predefined structure', async () => {
  const response = new jsonResponse();

  const expected = {
    status: 500,
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
    200,
    {},
    'OK',
    [],
    ""
    );

  const expected = {
    status: 200,
    data: {},
    message: 'OK',
    errors: [],
    url: ""
  };

  // Assert that response is a json object
  expect(typeof response).toBe('object');

  // Assert that the response is the same as the expected response
  expect(response).toMatchObject(expected);
});