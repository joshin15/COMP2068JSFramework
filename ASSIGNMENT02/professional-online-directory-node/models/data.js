const { client } = require('../db');

async function getData() {
    const db = client.db('sample_mflix');
    const collection = db.collection('documents');
    return await collection.find({}).toArray();
}

async function addData(data) {
    const db = client.db('sample_mflix');
    const collection = db.collection('documents');
    return await collection.insertOne(data);
}
