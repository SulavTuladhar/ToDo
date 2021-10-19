// MoongoDB congifg folder
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const conxURL = 'mongodb://localhost:27017';
const dbName = 'todo';
const OID = mongodb.ObjectId;

module.exports = {
    MongoClient,
    conxURL,
    dbName,
    OID
}