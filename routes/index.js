const express = require('express');
const multer = require('multer');
const router = express.Router();

const {
  fileUpload,
  getExcelColumns,
  filterColumns,
  addZeroPaddingToIds,
} = require('../functions/file-management');

const {
  formatDate,
  createURL,
  getBoletinData,
} = require('../functions/boletin');

const {
  jsonResponse,
} = require('../utils/json-response');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  const response = new jsonResponse(
    true,
    {},
    'Welcome to express',
    []
    );
  res.send(response);
});

/* GET healthcheck. */
router.get('/healthcheck', function(req, res, next) {
  const response = new jsonResponse(
    true,
    {},
    'OK',
    []
    );
  res.send(response);
  return;
});

/* POST file upload. */
router.post('/file', upload.single('xlsxFile'), async function(req, res, next) {
  try {
    const fileBuffer = req.file.buffer;
    let excelFile = await fileUpload(fileBuffer);
    let excelColumns = await getExcelColumns(excelFile);
    let filteredColumns = await filterColumns(excelColumns);
    let zeroPaddedColumns = await addZeroPaddingToIds(filteredColumns);

    const response = new jsonResponse(
      true,
      {zeroPaddedColumns},
      'File uploaded successfully',
      []
      );
    
    res.send(response);

  } catch (error) {
    const response = new jsonResponse(
      false,
      {},
      'Error uploading file',
      [error.message]
      );
    res.status(400).send(response);
  }
});

/* GET get data from boletin page. */
router.get('/boletin', async function(req, res, next) {
  try {
    const date = req.query.date;
    const city = req.query.city;

    if (!date || !city) {
      throw new Error('Missing query parameters');
    }

    const { datetime, year, formattedDate } = formatDate(date);
    const URL = createURL({ datetime, year, formattedDate }, city);
    const boletinData = await getBoletinData(URL);

    if (boletinData instanceof Error) {
      throw boletinData;
    }

    const response = new jsonResponse(
      true,
      {boletinData},
      'Boletin data retrieved successfully',
      []
      );
    
    res.send(response);

  } catch (error) {
    const response = new jsonResponse(
      false,
      {},
      'Error retrieving boletin data',
      [error.message]
      );
    res.status(400).send(response);
  }
});

module.exports = router;
