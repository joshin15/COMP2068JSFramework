const express = require('express');
const router = express.Router();
const { client } = require('../db'); 

router.get('/documents', async (req, res) => {
    const db = client.db('sample_mflix'); // Replace with your actual database name
    const collection = db.collection('documents'); // Replace with your actual collection name

    try {
        const documents = await collection.find({}).toArray();
        res.render('documents', { documents });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
