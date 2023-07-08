const xlsx = require('xlsx');

async function fileUpload(file) {
  const fileBuffer = file

  // Assuming the file buffer is in the variable 'buffer'
  const workbook = xlsx.read(file, { type: 'array' });
  const workingSheet = workbook.Sheets[workbook.SheetNames[0]];

  return workingSheet;
}

async function getExcelColumns(workingSheet) {
  // Transform the sheet to JSON data and get the first and second row
  const excelColumns = xlsx.utils.sheet_to_json(workingSheet, {
    header: 1,
    range: 0,
    raw: false,
    defval: null,
    blankrows: false,
    dateNF: 'yyyy-mm-dd',
  });

  return excelColumns;
}

async function filterColumns(excelColumns) {
  // Filter empty columns
  const regex = /^\d{0,5}\/\d{4}$/;

  const cleanedColumns = excelColumns.map((subarray) => [
    subarray[0] && subarray[0].trim() ? subarray[0].trim().replace(/\s+/g, '') : '',
    subarray[1] && subarray[1].trim() ? subarray[1].trim().replace(/\s+/g, '') : '',
  ]);

  const filteredColumns = cleanedColumns.filter(([column1, column2]) => {
    const value = column2;
    return regex.test(value);
  });

  return filteredColumns;
}

async function addZeroPaddingToIds(filteredColumns) {
  // Add zero padded IDs
  const zeroPaddedColumns = filteredColumns.map(([column1, column2]) => {
    const itemSplit = column2.split('/');
    const newItem = [itemSplit[0].padStart(5, '0'), itemSplit[1]].join('/');
    return [column1, newItem.trim()];
  });

  return zeroPaddedColumns;
}

module.exports = {
  fileUpload,
  getExcelColumns,
  filterColumns,
  addZeroPaddingToIds,
};
