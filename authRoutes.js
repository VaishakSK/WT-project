const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// User registration route
router.post('/register', async (req, res) => {
    try {
        const isAdmin = req.body.isAdmin === false;
        const user = await User.register(new User({ username: req.body.username }), req.body.password);
        passport.authenticate('local')(req, res, () => {
            res.json({ success: true, user });
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// User login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (!user) {
            return res.status(401).json({ success: false, error: 'Authentication failed' });
        }
        req.login(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ success: false, error: loginErr.message });
            }
            return res.json({ success: true, user });
        });
    })(req, res, next);
});

// Check authentication route
router.get('/check-auth', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        res.json({ success: true, user: req.user });
    } else {
        res.json({ success: false, user: null });
    }
});

// User logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

// Admin registration form route
router.get('/admin/register', (req, res) => {
    res.render('adminRegister');
});

// User registration route
router.post('/admin/register', async (req, res) => {
    try {
        const isAdmin = true;
        const { username, password, email } = req.body;

        const secretCode = req.body.secretCode;
        if (secretCode !== 'abcd1234') {
            return res.render('adminRegister', { errorMessage: 'Invalid secret code' })
        }
        // Validate email presence
        if (!email) {
            return res.status(400).json({ success: false, error: "Email is required" });
        }

        // Register new user
        const user = await User.register(new User({ username, email, isAdmin }), password);
        passport.authenticate('local')(req, res, () => {
            // res.json({success: true, user});
            res.redirect('/admin/login')
        })
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
}
});

// Admin login form route
router.get('/admin/login', (req, res) => {
    res.render('adminLogin');
});

// Admin login submission route
router.post('/admin/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (!user) {
            return res.render('adminLogin', { errorMessage: 'Authentication Failed' });
        }
        if (!user.isAdmin) {
            return res.render('adminLogin', { errorMessage: 'You are not an admin' });
        }
        req.login(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ success: false, error: loginErr.message });
            }
            res.redirect('/dashboard'); // Redirect to the desired admin route after login
        });
    })(req, res, next);
});

// Admin logout route
router.get('/admin/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.redirect('/admin/login');
    });
});

module.exports = router;
