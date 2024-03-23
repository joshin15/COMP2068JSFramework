 var express = require('express');
  var router = express.Router();
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Dog Breeds Information Website' });
  });
  // Route for Bulldog
  router.get('/bulldog', function(req, res, next) {
    res.render('bulldog', { title: 'Bulldog Information' });
  });
  // Route for Golden Retriever
  router.get('/goldenRetriever', function(req, res, next) {
    res.render('goldenRetriever', { title: 'Golden Retriever Information' });
  });
  // Route for German Shepherd
  router.get('/germanShepherd', function(req, res, next) {
    res.render('germanShepherd', { title: 'German Shepherd Information' });
  });
  // Route for Poodle
  router.get('/poodle', function(req, res, next) {
    res.render('poodle', { title: 'Poodle Information' });
  });
  module.exports = router;
  
