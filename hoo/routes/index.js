var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const { session } = req;
  console.log(session);
  res.render('index', {
    title: '도서관리시스템',
    page: './pages/main' ,
    user: session.user,
  });
 });
module.exports = router;