const mongoose = require('mongoose');

const mealCountSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    breakfast_count: {
        type: Number,
        default: 0
    },
    lunch_count: {
        type: Number,
        default: 0
    },
    dinner_count: {
        type: Number,
        default: 0
    }
});

// Create the model first
const MealCount = mongoose.model('MealCount', mealCountSchema);

// Then define the initialization function
const initializeMealCounts = async () => {
    try {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        for (const day of days) {
            // Check if entry exists
            const exists = await MealCount.findOne({ day });
            
            if (!exists) {
                // Create new entry if it doesn't exist
                await MealCount.create({
                    day,
                    breakfast_count: 0,
                    lunch_count: 0,
                    dinner_count: 0
                });
                console.log(`Initialized meal counts for ${day}`);
            }
        }
        console.log('Meal counts initialization complete');
    } catch (error) {
        console.error('Error initializing meal counts:', error);
    }
};

// Run initialization
initializeMealCounts();

module.exports = MealCount;
