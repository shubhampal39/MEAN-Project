var express = require('express');
var router = express.Router();
var userModule=require('../module/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'password Management System',msg:"login"});
});

router.get('/suceess', function(req, res, next) {
  res.render('suceess', { title: 'password Management System', msg:'suceessfuly' });

});


router.post('/index', function(req, res, next) {

  var user1=req.body.uname;
  var pass1=req.body.password;
  userModule.findOne({username:user1,password:pass1},function(err,user){
      if(err){
        console.log(err);
        return res.status(500).send();
      }
      if(!user){
        return res.status(404).send();
      }

     // return res.status(200).send();

   // if(err) throw err; 
   return res.render('suceess', { title: 'password Management System', msg:'user login successful' });

  })

});



router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'password Management System', msg:'' });

});




router.post('/signup', function(req, res, next) {
 //initialize name =ejs file variable name
 var user=req.body.uname;
 var email1=req.body.email;
 var pass=req.body.password;
 var confpass=req.body.confpassword;

 var userDetails=new userModule({
//database scema name from user.js=obove initialize name
  username:user,
  email:email1,
  password:pass

 });
 //save to databse
 userDetails.save((err,doc)=>{
  if(err) throw err; 
  res.render('index',  { title: 'password Management System', msg:'user registered successful' });
 })
  
});

module.exports = router;
