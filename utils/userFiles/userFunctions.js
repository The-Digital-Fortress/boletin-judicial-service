const { DateTime } = require("luxon");
const { Timestamp } = require('firebase-admin/firestore');
const { getAllRecordsWith2Conditions, updateRecordObjectByUid, updateRecordFieldByUid } = require('../firebase/firestoreFunctions');
const { searchFile } = require('../boletin/searchFiles');
const db = require ('../firebase/initializeFirebase');

async function searchUserFiles(userid) {

// Search for files that have not been found yet
const userFiles = await getAllRecordsWith2Conditions(db, 'userFiles', 'uid', userid, 'fileFound', false);
const foundFiles = [];

  // For each file, search for it in the boletin
  for (const [key, val] of Object.entries(userFiles)) {
    const searchDate = DateTime.now().setZone("America/Los_Angeles").toJSDate();

    const searchResult = await searchFile(db, searchDate, val.city, val.fileId, val.fileJury);

    // If file was found, update userFiles record
    if (searchResult.foundFile == true) {
      const updateObject = {
        fileFound: true,
        foundDate: Timestamp.fromDate(DateTime.now().setZone("America/Los_Angeles").toJSDate()),
        fileFoundUrl: searchResult.formattedURL,
        partsName: searchResult.partsName
      }
      updateRecordObjectByUid(db, 'userFiles', key, updateObject);
      foundFiles.push(searchResult);
    }
  }

  //Update user lastUpdate field
  updateRecordFieldByUid(db, userid, 'lastTimeUpdateFiles', Timestamp.fromDate(DateTime.now().setZone("America/Los_Angeles").toJSDate()), 'users');

  return foundFiles;
}

module.exports = {
  searchUserFiles,
};