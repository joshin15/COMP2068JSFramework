var express = require('express');
var router = express.Router();
const fs = require('fs');
const { client } = require('../db');
var path = require('path'); 
const multer = require('multer');
const {ObjectId } = require('mongodb');

var formidable = require('formidable');
const { log } = require('handlebars/runtime');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public/images/uploads')); // Save uploaded files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, file.originalname); // Rename file with current timestamp + original extension
  }
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  var dir = path.join('public/images/documents');
  const fileList = fs.readdirSync(dir);
  var files = [];
  for (var name of fileList) {
    // If it is a file, push the full path to the files array
    var fileName = name;
    var extension = path.extname(name);
    name = path.basename(name,extension);
    name = name.replaceAll('_',' ');
    files.push({name:name, fileName:fileName})
  }
  res.render('index', { title: 'Professional Directory',layout: 'layout', login_user:req.session.user,files:files });
});

router.get('/login', async (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    var cookieRemember = req.cookies.cookieRemember;
    var cookieEmail = req.cookies.cookieEmail;
    var cookiePassword = req.cookies.cookiePassword;
    res.render('login', { title: 'Professional Directory Login',layout: 'layout',cookieRemember:cookieRemember,
    cookieEmail:cookieEmail,cookiePassword:cookiePassword});
  }
});
router.get('/sign-up', async (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('sign_up', { title: 'Professional Directory Sign-up',layout: 'layout' });
  }
});
router.post('/user-sign-up', async (req, res) => {
    var name = req.body.name;
    var email =req.body.email;
    var password = req.body.password;

	  req.checkBody('name', 'Please enter your full name').notEmpty().trim();
	  req.checkBody('email', 'Please enter your valid email address').isEmail();
	  req.checkBody('password', 'Please enter your password').notEmpty().trim();
    var errors = req.validationErrors();
	  if(errors){
	    var message = errors[0].msg;
	    res.send(message);
	    res.end();
	  }else{
      const db = client.db('sample_mflix'); 
      db.collection("users").findOne({'email':email}).then(result => {
        if(!result){
          var data = {
            "name": name,
            "email":email,
            "password":encryption(password)
        }
        db.collection('users').insertOne(data).then(collection => {
            resultData = {};
            resultData['userId'] = collection.insertedId.toString();
            resultData['name'] = name;
            req.session.user = resultData;

            res.send('Success');
            res.end();
            
          });
        }else{
          res.send('Email address already registered.');
          res.end();
        }
      });
    }
});
router.post('/user-login', async (req, res) => {
  var email =req.body.email;
  var password = req.body.password;

  var cookie = req.cookies;
  if(req.body.remember){
    res.cookie('cookieRemember','Yes', { maxAge: 9000000000*7*24 });
    res.cookie('cookieEmail',email, { maxAge: 9000000000*7*24});
    res.cookie('cookiePassword',password, { maxAge: 9000000000*7*24});
  }else{
    res.cookie('cookieRemember','', { maxAge: 900000});
    res.cookie('cookieEmail','', { maxAge: 900000});
    res.cookie('cookiePassword','', { maxAge: 900000});
  }
  req.checkBody('email', 'Please enter your valid email address').isEmail();
  req.checkBody('password', 'Please enter your password').notEmpty().trim();
  var errors = req.validationErrors();
  if(errors){
    var message = errors[0].msg;
    res.send(message);
    res.end();
  }else{
    const db = client.db('sample_mflix'); 
    db.collection("users").findOne({'email':email, 'password':encryption(password)}).then(result => {
      if(result){
          resultData = {};
          resultData['userId'] = result._id.toString();
          resultData['name'] = result.name;
          req.session.user = resultData;
          res.send('Success');
          res.end();
      }else{
        res.send('Email Address and Password is not found. Please enter your valid login details.');
        res.end();
      }
    });
  }
});
router.get('/documents', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    const db = client.db('sample_mflix'); 
    const collection = db.collection('documents'); 
    try {
        const documents = await collection.find({}).toArray();
        res.render('documents', {title: 'Professional Directory Documents', documents:documents ,layout: 'layout', login_user:req.session.user});
    } catch (error) {
      res.send('Something want to wrong. Please try after sometime. ');
      res.end();
    }
  }
});
router.post('/save-document', upload.single('file'), async (req, res) => {
  
  const { originalname, path } = req.file
  var title =req.body.title;
  var description =req.body.description;
  var data = {
    "title": title,
    "description":description,
    "document":originalname,
    "create_at": Date.now
}
const db = client.db('sample_mflix'); 
db.collection('documents').insertOne(data).then(collection => {
    res.send('Success');
    res.end();
  });
});

router.post('/delete-document-record', async (req, res) => {
  var row_id = req.body.rowID;
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    const db = client.db('sample_mflix'); 
    const collection = db.collection('documents'); 
    try {
        await collection.deleteOne({_id:new ObjectId(row_id)});
        res.send('Success');
        res.end();
    } catch (error) {
      console.log(error);
      res.send('Something want to wrong. Please try after sometime. ');
      res.end();
    }
  }
});

router.post('/update-document', upload.single('file'), async (req, res) => {
  
  const {originalname} = req.file ? req.file:'';
  var title =req.body.edit_title;
  var description =req.body.edit_description;
  var fileName = originalname;
  if(!req.file){
    fileName  = req.body.old_filename;
  }
const updateDocument = {
  $set: {
    "title": title,
    "description":description,
    "document":fileName,
    "create_at": Date.now
  }
};
const filter = { _id: new ObjectId(req.body.row_id) };
const db = client.db('sample_mflix'); 
db.collection('documents').updateOne(filter, updateDocument);
 res.send('Success');
 res.end();
});
router.post('/get-document-record', async (req, res) => {
  var row_id = req.body.rowID;
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    const db = client.db('sample_mflix'); 
    const collection = db.collection('documents'); 
    try {
      const document = await collection.findOne({_id:new ObjectId(row_id)});
        res.send(document);
        res.end();
    } catch (error) {
      console.log(error);
      res.send('Something want to wrong. Please try after sometime. ');
      res.end();
    }
  }
});
router.get('/logout', async (req, res) => {
  req.session.user = null;
  var sessionData = '';
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;
