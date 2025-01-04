const mongoose = require('mongoose');
const { VARCHAR } = require('mysql/lib/protocol/constants/types');

const timingSchema = new mongoose.Schema({
    meal: { type: String }, // Breakfast, Lunch, Dinner
    cost: { type: Number },
    time: { type: String }
});

const Timing = mongoose.model('Timing', timingSchema);
module.exports = Timing;
