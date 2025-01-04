const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');
const MealCount = require('../models/MealCount');
const Timing = require('../models/timing');
const Buyer = require('../models/Buyer');

router.get('/buyCoupons-admin', async (req, res) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const menuItems = await Menu.find({});
    const Timings = await Timing.find({});
    res.render('buyCoupons', { days, menuItems, Timings });
});

router.post('/buyCoupons-admin', async (req, res) => {
    const { meals } = req.body;
    console.log('Received meals data:', meals);

    try {
        if (!meals || Object.keys(meals).length === 0) {
            return res.status(400).json({ message: 'No meals selected' });
        }

        // Create buyer entry with meals matching the schema structure
        const formattedMeals = Object.entries(meals).map(([day, mealTypes]) => ({
            day: day,
            breakfast: mealTypes.includes('breakfast'),
            lunch: mealTypes.includes('lunch'),
            dinner: mealTypes.includes('dinner')
        }));

        console.log('Formatted meals:', formattedMeals);

        const buyerEntry = new Buyer({
            meals: formattedMeals,
            createdAt: new Date()
        });

        const savedBuyer = await buyerEntry.save();
        console.log('Saved buyer entry:', savedBuyer);

        const menuItems = await Menu.find({});
        const Timings = await Timing.find({});
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        res.render('buyCoupons', { 
            days, 
            menuItems,
            Timings,
            success: 'Meals successfully booked!' 
        });
        
    } catch (err) {
        console.error(err);
        res.render('buyCoupons', {
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            menuItems: await Menu.find({}),
            Timings: await Timing.find({}),
            error: 'Error processing request'
        });
    }
});

module.exports = router;
