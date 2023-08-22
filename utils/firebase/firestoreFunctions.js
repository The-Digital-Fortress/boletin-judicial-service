const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const Logger = require('../logger.js');

const logger = new Logger('firestoreFunctions');

// Get a list of records from your database
async function getAllRecords(db, collectionName) {
  logger.debug(`{
    function: getAllRecords,
    collectionName: ${collectionName}
  }`);
  const recordRef = db.collection(collectionName);
  const recordSnapshot = await recordRef.get();
  const recordsData = {};
  recordSnapshot.forEach(doc => {
    doc.data();
    recordsData[doc.id] = doc.data();
  });
  logger.debug(`recordsData: ${JSON.stringify(recordsData)}`);
  return recordsData;
}


async function getAllRecordsWithCondition(db, collectionName, field, value) {
  logger.debug(`{
    function: getAllRecordsWithCondition,
    collectionName: ${collectionName}
  }`);
  const recordRef = db.collection(collectionName);
  const recordSnapshot = await recordRef.
  where(field, '==', value).
  get();
  const recordsData = {};
  recordSnapshot.forEach(doc => {
    doc.data();
    recordsData[doc.id] = doc.data();
  });
  logger.debug(`recordsData: ${JSON.stringify(recordsData)}`);
  return recordsData;
}

async function getAllRecordsWith2Conditions(db, collectionName, field, value, field2, value2) {
  logger.debug(`{
    function: getAllRecordsWith2Conditions,
    collectionName: ${collectionName}
  }`);
  const recordRef = db.collection(collectionName);
  const recordSnapshot = await recordRef.
  where(field, '==', value).
  where(field2, '==', value2).
  get();
  const recordsData = {};
  recordSnapshot.forEach(doc => {
    doc.data();
    recordsData[doc.id] = doc.data();
  });
  logger.debug(`recordsData: ${JSON.stringify(recordsData)}`);
  return recordsData;
}

async function getAllRecordsWithOrCondition(db, collectionName, field, value, value2) {
  logger.debug(`{
    function: getAllRecordsWithOrCondition,
    collectionName: ${collectionName}
  }`);
  const recordRef = db.collection(collectionName);
  const recordSnapshot = await recordRef.
  where(
    Filter.or(
      Filter.where(field, '==', value),
      Filter.where(field, '==', value2)
    )
  ).
  get();
  const recordsData = {};
  recordSnapshot.forEach(doc => {
    doc.data();
    recordsData[doc.id] = doc.data();
  });
  logger.debug(`recordsData: ${JSON.stringify(recordsData)}`);
  return recordsData;
}

async function getRecordByFieldValue(db, collectionName, field, value) {
  logger.debug(`{
    function: getRecordByFieldValue,
    collectionName: ${collectionName}, 
    field: ${field}, 
    value: ${value}
  }`);
  const recordRef = db.collection(collectionName);
  const recordSnapshot = await recordRef.
  where(field, '==', value).
  limit(1).
  get();
  const recordsData = {};
  recordSnapshot.forEach(doc => {
    doc.data();
    recordsData[doc.id] = doc.data();
  });
  // logger.debug(`recordsData: ${JSON.stringify(recordsData)}`);
  return recordsData;
}

// Get record by field value and date
async function getRecordByFieldValueAndDate(db, collectionName, field, value, date) {
  logger.debug(`{
    function: getRecordByFieldValueAndDate,
    collectionName: ${collectionName}, 
    field: ${field}, 
    value: ${value}, 
    date: ${date}
  }`);
  const recordRef = db.collection(collectionName);
  const recordSnapshot = await recordRef.
  where(field, '==', value).
  where('createdOn', '==', Timestamp.fromDate(date)).
  limit(1).
  get();
  const recordsData = {};
  recordSnapshot.forEach(doc => {
    doc.data();
    recordsData[doc.id] = doc.data();
  });
  logger.debug(`recordsData: ${JSON.stringify(recordsData)}`);
  return recordsData;
}

// Create a new object in your database with auto-generated id
async function createRecord(db, object, collectionName) {
  logger.debug(`{
    function: createRecord,
    collectionName: ${collectionName}, 
    object: ${JSON.stringify(object)}
  }`);
  const recordsRef = db.collection(collectionName).doc();
  await recordsRef.set(object);
  logger.debug(`record created: ${JSON.stringify(object)}`);
  return true;
}

// Create a new object in your database with specific id
async function createRecordWithId(db, object, id, collectionName) {
  logger.debug(`{
    function: createRecordWithId,
    collectionName: ${collectionName}, 
    object: ${JSON.stringify(object)}
  }`);
  const recordsRef = db.collection(collectionName).doc(id);
  await recordsRef.set(object);
  logger.debug(`record created: ${JSON.stringify(object)}`);
  return true;
}

// Update a user in your database
async function updateRecordFieldByUid(db, uid, field, value, collectionName) {
  logger.debug(`{
    function: updateRecordFieldByUid,
    collectionName: ${collectionName}, 
    uid: ${uid}, 
    field: ${field}, 
    value: ${value}
  }`);
  const usersRef = db.collection(collectionName).doc(uid);
  await usersRef.update({ [field]: value });
  logger.debug(`record updated: ${JSON.stringify({ [field]: value })}`);
  return true;
}

// Update entire object
async function updateRecordObjectByUid(db, collectionName, uid, object) {
  logger.debug(`{
    function: updateRecordObject,
    collectionName: ${collectionName}, 
    object: ${JSON.stringify(object)}
  }`);
  const usersRef = db.collection(collectionName).doc(uid);
  await usersRef.update(object);
  logger.debug(`record updated: ${JSON.stringify(object)}`);
  return true;
}

module.exports = { 
  getAllRecords,
  getAllRecordsWithCondition,
  getAllRecordsWith2Conditions,
  getAllRecordsWithOrCondition,
  getRecordByFieldValue, 
  getRecordByFieldValueAndDate,
  createRecord,
  createRecordWithId,
  updateRecordFieldByUid, 
  updateRecordObjectByUid 
};