const { getRecordByFieldValue } = require('../firebase/firestoreFunctions');
const { formatDate, createURL } = require('./boletinFunctions');
const { MY_JUZGADO_MAP, MUNICIPALITIES } = require('../constants');
const Logger = require('../logger');

const logger = new Logger('searchFiles');

async function searchFile (db, searchDate, city, userFile, userJury) {

  logger.debug(`{
    searchDate: ${searchDate},
    city: ${city}, 
    userFile: ${userFile}
    userJury: ${userJury}
  }`);

  const formattedDateArray = formatDate(searchDate);
  const formattedURL = createURL(formattedDateArray, city);
  const formattedName = MUNICIPALITIES[city] + formattedDateArray.formattedDate;
  logger.debug(`formattedName: ${formattedName}`);
  const boletinData = await getRecordByFieldValue(db, 'files', '__name__', formattedName);
  let foundFile = false;
  let fileData = null;

  boletinData[formattedName].data.forEach(jury => {

    if (foundFile) return; // Break loop if file was found

    jury?.files.forEach((file, index) => {
      if (file[1] === userFile && jury.key.includes(MY_JUZGADO_MAP[userJury]))  {
        logger.debug(`file found: ${JSON.stringify(file)}`);
        foundFile = true;
        fileData = file["2"];
        return; // Break loop if file was found
      }
    })
  });
  
  return {
    foundFile: foundFile, 
    formattedURL: formattedURL,
    partsName: fileData
  };
}

module.exports = {
  searchFile,
};