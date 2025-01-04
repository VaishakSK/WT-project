const express = require('express');
const router = express.Router();
const MealCount = require('../models/MealCount');

router.get("/totalMeals-admin", async (req, res)=>{
    try{
        const totalMeals = await MealCount.find({});
        res.render('totalMeals',{ totalMeals });
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Error fetching menu data'});
    }
})

module.exports = router;