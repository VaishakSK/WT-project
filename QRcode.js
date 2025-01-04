const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');

router.get('/QRcode-admin', async (req, res) => {
    const buyers = await Buyer.find({});
    res.render('QRcode', { buyers: JSON.stringify(buyers) });
});

module.exports = router;