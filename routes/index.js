var express=require('express');
var router=express.Router();

var conectionCounter=0; // Counter for connections on port

// Get Homepage
router.get('/',function(req,res){
    res.render('index')
    console.log ('Connection counter: '+ ++conectionCounter);
})

module.exports=router;