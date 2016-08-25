/**
 * Module dependencies
 */

var express = require('express');
var app = express();
app.listen(3000)
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var imgPath = 'gg.jpg';


mongoose.connect('localhost', 'testing_storeImg');


var schema = new Schema({
    img: { data: Buffer, contentType: String }
});


var A = mongoose.model('A', schema);

mongoose.connection.on('open', function () {
  console.log('mongo is open');

  A.remove(function (err) {
    console.log('removed old docs');


    var a = new A;
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/jpg';
    a.save(function (err, a) {


      console.log('saved img to mongo');

      // start a demo server
      app.get('/', function (req, res, next) {
        A.findById(a, function (err, doc) {

          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });
      });

      app.on('close', function () {
        console.log('dropping db');
        mongoose.connection.db.dropDatabase(function () {
          console.log('closing db connection');
          mongoose.connection.close();
        });
      });

      app.listen(3300, function (err) {

        console.log('press CTRL+C to exit');
      });


    });
  });

});

/*var express = require('express'),
  app = express(),
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
*/
/*
  var express = require('express')
  var bodyParser = require('body-parser')
  var app = express()
  var mongodb = require('mongodb');
  var MongoClient = require('mongodb').MongoClient;
  // grab the things we need
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  // create a schema
  var userSchema = new Schema({
    name: String,
  //  userId: { type: String, required: true, unique: true },
    ///images: { type: String, required: true },
    //admin: Boolean,
    Ban : Boolean,
    points : Number,
    total_points : Number

  });
  var User = mongoose.model('User', userSchema);
  var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017', function(err, db) {
if(err) throw err;
});
  // make this available to our users in our Node applications
  module.exports = User;
  app.use(express.static(__dirname+"/public"))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
   extended: true
  }));
  app.listen(3000)

  app.post('/Create_User', function(request, response){
   var json = request.body
   var User = require('./app/models/name');//grabbing the name path
   new_name = json.username
   //new_userId = json.
   var newUser = User({
     name: new_name,
    // userId: this.id,
     Ban : false,
     points : 0,
     total_points : 0
   });

// save the user
newUser.save(function(err) {
  if (err) throw err;

  console.log('User created!');
});
});
*/
//new JwtStrategy(options, verify)

/*MongoClient.connect('mongodb://localhost:27017', function(err,db) {

  assert.equal(null,err)
  console.log("gog")
  0app.get('/', function(req,res) {
    db.collections('users').find({}).toArray(function(err,docs){
      res.render('users', {'users':docs});

    });
  });
  app.use(function(req,res){
    res.sendStatus(404);
  });
  var server = app.listen(3000,function(){
    var port = server.address().port;
    console.log('listening on port %s',port);
  });
});
*/
/*
app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});*/

/*
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// img path
var imgPath = '/path/to/some/img.png';

// connect to mongo
mongoose.connect('localhost', 'testing_storeImg');

// example schema
var schema = new Schema({
    img: { data: Buffer, contentType: String }
});

// our model
var A = mongoose.model('A', schema);

mongoose.connection.on('open', function () {
  console.error('mongo is open');

  // empty the collection
  A.remove(function (err) {
    if (err) throw err;

    console.error('removed old docs');

    // store an img in binary in mongo
    var a = new A;
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/png';
    a.save(function (err, a) {
      if (err) throw err;

      console.error('saved img to mongo');

      // start a demo server
      var server = express.createServer();
      server.get('/', function (req, res, next) {
        A.findById(a, function (err, doc) {
          if (err) return next(err);
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });
      });

      server.on('close', function () {
        console.error('dropping db');
        mongoose.connection.db.dropDatabase(function () {
          console.error('closing db connection');
          mongoose.connection.close();
        });
      });

      server.listen(3000, function (err) {
        console.error('press CTRL+C to exit');
      });

      process.on('SIGINT', function () {
        server.close();
      });
    });
  });

});
*/
