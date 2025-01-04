const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    meals: [{
        day: {
            type: String,
            required: true
        },
        breakfast: {
            type: Boolean,
            default: false
        },
        lunch: {
            type: Boolean,
            default: false
        },
        dinner: {
            type: Boolean,
            default: false
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Buyer', buyerSchema);
