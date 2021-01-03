var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.get('/join', function(req, res, next) {
  res.render('join', { title: 'join' });
});

router.get('/game_list', function(req, res, next) {
  res.render('game_list', { title: 'game_list' });
});

router.get('/game_insert', function(req, res, next) {
  res.render('game_insert', { title: 'game_list' });
});

module.exports = router;
