var express = require('express');
var router = express.Router();
const pool = require("../config/dbConfig");


/* GET home page. */
router.get('/', function (req, res, next) {
  const { session } = req;  

  const {search} = req.query;
  if(!search){
    res.redirect('/')
  }
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    }
    let query = "SELECT BOOK_NAME, BOOK_PUBLISH, BOOK_PRICE,BOOK_ID FROM t_book WHERE BOOK_NAME LIKE '%' ? '%'";
    conn.query(query, [search], (error, result) => {
      if (error) {
        throw error;
      }
      conn.release();
      res.render('index', {
        title: '도서관리시스템',
        page: './pages/book_search',
        user: session.user,
        hi : result,
      });
    });
  });
});

//카트등록
router.get(
  "/ok",
  //로그인 확인
  function (req, res, next) {
    const { session } = req;
    if (!session.user) {
      res.redirect("/users/signin");
      return;
    }
  },

  //카트 등록
  //수량 확인후 실행
  (req, res, next) => {
    const { session } = req;
    if (!session.user) {
      res.redirect("/users/signin");
      return;
    }

    const { USER_ID } = session.user;

    const { book_id ,ok } = req.body;
    let query =
      "INSERT INTO bookstroe.t_cart(USER_ID, BOOK_ID , BOOK_COUNT) VALUES (?, ?, ?);";
    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      }
      conn.query(
        query,
        [USER_ID, ,],
        (error, result) => {
          if (error) {
            throw error;
          }
          conn.release();
          if (result) {
            res.redirect("/users/mypage");
            return;
          }
          res.redirect("/users/card");
        }
      );
    });
  }
);
module.exports = router;
