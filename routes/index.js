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

module.exports = router;
