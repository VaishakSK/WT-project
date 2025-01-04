const express = require('express');
const router = express.Router();

router.get('/QRcodeScanner-admin', (req, res) => {
    res.render('QRcodeScanner');
});

module.exports = router;