const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');

router.get('/purchaseHistory-admin', async (req, res) => {
    const buyers = await Buyer.find({});
    res.render('purchaseHistory', { buyers });
});

module.exports = router;
