const express = require('express')
const router = express.Router()

function isAdminAuthenticated(req,res,next){
    if(req.isAuthenticated() && req.user.isAdmin){
        return next()
    }
    res.redirect('/admin/login')
    
}
router.get('/', (req,res)=>{
    res.redirect('/admin/login')
})

router.get('/dashboard', isAdminAuthenticated, (req,res)=>{
    res.render('dashboard')
})

router.get("/Schedule", (req, res)=>{
    res.redirect('/menu-schedule')
})

router.get("/adminPanel", (req, res)=>{
    res.render('adminPanel')
})

router.get("/buyCoupouns", (req, res)=> {
    res.redirect('/buyCoupons-admin')
})

router.get("/totalMeals", (req,res)=> {
    res.redirect('/totalMeals-admin')
})

router.get("/purchaseHistory", (req,res)=> {
    res.redirect('/purchaseHistory-admin')
})

router.get("/QRcode", (req,res)=> {
    res.redirect('/QRcode-admin')
})

router.get("/scanQRcode", (req,res)=> {
    res.redirect('/QRcodeScanner-admin')
})

router.get("/addAmount", (req, res)=> {
    res.render('addAmount')
})

module.exports = router;