require('dotenv').config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 4174;

// Configure MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://vaishakkolhar123:vaishaksk@mess.zcx9z.mongodb.net/?retryWrites=true&w=majority&appName=Mess', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Make sure models are imported after MongoDB connection
require('./models/MealCount');

// Middleware for session management
app.use(session({
    secret: process.env.SESSION_SECRET || 'Vaishak2612',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || 'mongodb+srv://vaishakkolhar123:vaishaksk@mess.zcx9z.mongodb.net/?retryWrites=true&w=majority&appName=Mess'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));

// Passport.js for authentication
const User = require('./models/User');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs'); // Handlebars template engine

// Import routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboard');
const adminPanelRoutes = require('./routes/adminpanel');
const Schedule = require('./routes/schedule');
const buyCouponsAdmin = require('./routes/buyCoupons');
const totalMeals = require('./routes/totalMeals');
const purchaseHistory = require('./routes/purchaseHistory');
const QRcode = require('./routes/QRcode');
const QRcodeScanner = require('./routes/QRcodeScanner.js');

// Use routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', adminPanelRoutes);
app.use('/', Schedule);
app.use('/', buyCouponsAdmin);
app.use('/', totalMeals);
app.use('/', purchaseHistory);
app.use('/', QRcode);
app.use('/', QRcodeScanner);


// Start the server
app.listen(port)
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy. Please try a different port.`);
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  })
  .on('listening', () => {
    console.log(`Server is running on port ${port}`);
  });
