const express = require('express');
const router = express.Router();
const Menu = require('../models/menu'); 
const Timing = require('../models/timing'); 

// Route to display schedule and timings
router.get('/menu-schedule', async (req, res) => {
    try{
        const menuItems = await Menu.find({});
        const timings = await Timing.find();
        res.render('Schedule',{ menuItems, timings });
        console.log(timings);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Error fetching menu data'});
    }
});

module.exports = router;