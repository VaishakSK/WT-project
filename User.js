const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: [true, "Email is required"], // Ensure email is mandatory
      unique: true, // Enforce uniqueness
      sparse: false, // Avoid sparse conflicts
  },
  username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
  },
  isAdmin: {
      type: Boolean,
      default: false,
  },
  wallet: {
      type: Number,
      default: 0
  }
});

// Add passport-local-mongoose plugin for password hashing and authentication
userSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model('User', userSchema);
