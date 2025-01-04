const mongoose = require('mongoose');

// Define the schema
const menuSchema = new mongoose.Schema({
    day: { type: String, required: true, unique: true },
    breakfast: { type: String, default: '' },
    lunch: { type: String, default: '' },
    dinner: { type: String, default: '' },
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;