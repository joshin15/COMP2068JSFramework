const { MongoClient } = require('mongodb');
// const uri = 'mongodb+srv://admin:Comp2068@cluster0.8ok7m7n.mongodb.net/TaskManager'; // MongoDB Atlas connection URI
const uri = 'mongodb+srv://admin:Comp2068@cluster0.8ok7m7n.mongodb.net/'; // MongoDB Atlas connection URI
const client = new MongoClient(uri, { });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

module.exports = { connectToDatabase, client };