const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/addAmount-admin', (req, res) => {
    res.render('addAmount');
});
// Route to add money to wallet
// POST /api/wallet/add
router.post('/add', async (req, res) => {
    try {
        const { username, amount } = req.body;

        // Validate inputs
        if (!username || !amount || amount <= 0) {
            return res.status(400).json({ message: 'Please provide valid username and amount' });
        }

        // Find user by username and update wallet
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add amount to existing wallet balance
        user.wallet = (user.wallet || 0) + parseFloat(amount);
        await user.save();

        res.json({
            success: true,
            wallet: user.wallet,
            message: 'Amount added successfully'
        });

    } catch (error) {
        console.error('Error adding amount to wallet:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
