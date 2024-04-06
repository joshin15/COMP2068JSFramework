const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { getData, addData, updateData, deleteData } = require('../models/data');

// Private route to display data
router.get('/', ensureAuthenticated, async (req, res) => {
    const data = await getData();
    res.render('private', { user: req.user, data });
});

router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
    const id = req.params.id;
    await deleteData(id);
});

