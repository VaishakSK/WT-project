const express = require('express');
const router = express.Router();
const Menu = require('../models/menu'); // Menu model
const Timing = require('../models/timing');

// Function to add a meal
router.post('/admin/addMenu', async (req, res) => {
    try {
        const { day, mealType, mealDetails } = req.body;

        // Validate input
        const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const validMealTypes = ["breakfast", "lunch", "dinner"];

        if (!validDays.includes(day)) {
            return res.status(400).json({ error: 'Invalid day' });
        }

        if (!validMealTypes.includes(mealType)) {
            return res.status(400).json({ error: 'Invalid meal type' });
        }

        // Check if a document for the day already exists
        let menu = await Menu.findOne({ day });

        if (!menu) {
            // If no document exists, create a new one
            menu = new Menu({ day });
        }

        // Prevent duplication
        if (menu[mealType]) {
            return res.status(400).json({ error: `${mealType} already exists for ${day}` });
        }

        // Add the new meal
        menu[mealType] = {
            mealDetails
        };
        await menu.save();

        res.status(201).json({ message: 'Meal added successfully' });
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/admin/addTimings', async (req, res) => {
    try {
        const { meal, cost, timings } = req.body;
        const validMealTypes = ["breakfast", "lunch", "dinner"];

        if (!meal || !timings || !cost) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!validMealTypes.includes(meal)) {
            return res.status(400).json({ error: 'Invalid meal type' });
        }

        // Check if a document for the meal already exists
        let timing = await Timing.findOne({ meal });

        if (timing) {
            // Check if the same timings already exist
            if (JSON.stringify(timing.timings) === JSON.stringify(timings) && timing.cost === cost) {
                return res.status(400).json({ error: 'Timings and cost already exist for this meal' });
            }
        } else {
            // If no document exists, create a new one
            timing = new Timing({ meal });
        }

        // Update or add the timings and cost
        timing.timings = timings;
        timing.cost = cost;
        await timing.save();

        res.status(200).json({ message: 'Timings added successfully' });
    } catch (error) {
        console.error('Error adding timings:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Function to update a meal
router.post('/admin/updateMenu', async (req, res) => {
    try {
        const { day, mealType, mealDetails } = req.body;

        // Validate input
        const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const validMealTypes = ["breakfast", "lunch", "dinner"];

        if (!day || !mealType || !mealDetails) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!validDays.includes(day)) {
            return res.status(400).json({ error: 'Invalid day' });
        }

        if (!validMealTypes.includes(mealType)) {
            return res.status(400).json({ error: 'Invalid meal type' });
        }

        // Find the document for the specified day
        let menu = await Menu.findOne({ day });

        if (!menu) {
            return res.status(404).json({ error: `Menu for ${day} not found` });
        }

        // Update the meal type for the day with a string value
        menu[mealType] = mealDetails; // Assign mealDetails directly as a string
        await menu.save();

        res.status(200).json({ message: 'Meal updated successfully' });
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
