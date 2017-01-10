var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', isLogined, function(req, res){
    console.log(req.body.titleNote)
    res.render('index',{
        pass:req.session.passport.user

    })

    req.flash('test','it work')

});

function isLogined(req, res, next){ // Check if user logined then
    if(req.isAuthenticated()){
        req.flash('success_msg',"Hello")
        return next();
    } else {
        req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;