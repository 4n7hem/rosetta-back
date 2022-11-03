
//conecte no mongodb

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

let client = new MongoClient(url, { useNewUrlParser: true, monitorCommands: true });

module.exports = (client)
