var express = require("express");
var router = express.Router();
const pool = require("../config/dbConfig");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const { session } = req;
});

router.get("/signin", (req, res, next) => {
  const { session } = req;

  res.render("index", {
    title: "도서관리시스템",
    page: "./pages/signin",
    user: session.user,
  });
});

router.get("/signup", (req, res, next) => {
  const { session } = req;

  res.render("index", {
    title: "도서관리시스템",
    page: "./pages/signup",
    user: session.user,
  });
});
//mypage
//return 카드정보, 주소정보
router.get("/mypage", (req, res, next) => {
  const { session } = req;
  if (!session.user) {
    res.redirect("/users/signin");
    return;
  }
  const { USER_ID } = session.user;
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    }
    let card;
    let query =
      "SELECT CARD_DATE, CARD_TYPE, CARD_ID  FROM t_card WHERE USER_ID = ?";
    conn.query(query, [USER_ID], (error, result) => {
      if (error) {
        throw error;
      }
      card = result;
      let query =
        "SELECT ADDR_BASIC, ADDR_DETAIL  FROM t_addr AS c  WHERE USER_ID = ?";
      conn.query(query, [USER_ID], (error, result) => {
        if (error) {
          throw error;
        }

        conn.release();

        res.render("index", {
          title: "도서관리시스템",
          page: "./pages/mypage",
          user: session.user,
          card: card,
          addr: result,
        });
      });
    });
  });
});

//카드등록
router.post(
  "/card",
  //중복검사
  function (req, res, next) {
    const { session } = req;
    if (!session.user) {
      res.redirect("/users/signin");
      return;
    }
    const { USER_ID } = session.user;

    const { card_id, card_date, card_type } = req.body;

    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      }
      let query = "SELECT COUNT(*) as count FROM t_card WHERE CARD_ID = ?";
      conn.query(query, [card_id], (error, result) => {
        if (error) {
          throw error;
        }
        conn.release();
        const [{ count }] = result;
        if (count) {
          res.redirect("/users/card");
          return;
        }
        next();
      });
    });
  },

  //카드 등록
  //카드 중복검사후 실행
  (req, res, next) => {
    const { session } = req;
    if (!session.user) {
      res.redirect("/users/signin");
      return;
    }

    const { USER_ID } = session.user;

    const { card_id, card_date, card_type } = req.body;
    let query =
      "INSERT INTO bookstroe.t_card(CARD_ID, CARD_DATE, CARD_TYPE, USER_ID) VALUES (?, ?, ?, ?);";
    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      }
      conn.query(
        query,
        [card_id, card_date, card_type, USER_ID],
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

router.get("/card", (req, res, next) => {
  const { session } = req;

  res.render("index", {
    title: "도서관리시스템",
    page: "./pages/card",
    user: session.user,
  });
});
//카드 삭제
router.get("/carddel",(req, res, next) => {
  const { session } = req;
  const { card_this } = req.body;
  let query =
    "DELETE t_card WHERE CARD_ID = (?);";
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
     }
     conn.query(
       query,
       [card_this],
       (error, result) => {
         if (error) {
           throw error;
         }
         conn.release();
         if (result) {
           res.redirect("/users/mypage");
           return;
         }
         res.redirect("/users/mypage");
       }
     );
  });
});

//주소등록
router.post(
  "/addr",
  //중복검사
  function (req, res, next) {
    const { session } = req;
    if (!session.user) {
      res.redirect("/users/signin");
      return;
    }
    const { USER_ID } = session.user;

    const { addr_basic, addr_detail } = req.body;

    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      }
      let query = "SELECT COUNT(*) as count FROM t_addr WHERE USER_ID = ?";
      conn.query(query, [USER_ID], (error, result) => {
        if (error) {
          throw error;
        }
        conn.release();
        const [{ count }] = result;
        if (count) {
          res.redirect("/users/addr");
          return;
        }
        next();
      });
    });
  },

  //카드 등록
  //카드 중복검사후 실행
  (req, res, next) => {
    const { session } = req;
    if (!session.user) {
      res.redirect("/users/signin");
      return;
    }

    const { USER_ID } = session.user;

    const { addr_basic, addr_detail } = req.body;
    let query =
      "INSERT INTO bookstroe.t_addr(ADDR_BASIC, ADDR_DETAIL, USER_ID) VALUES (?, ?, ?);";
    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      }
      conn.query(query, [addr_basic, addr_detail, USER_ID], (error, result) => {
        if (error) {
          throw error;
        }
        conn.release();
        if (result) {
          res.redirect("/users/mypage");
          return;
        }
        res.redirect("/users/addr");
      });
    });
  }
);
router.get("/addr", (req, res, next) => {
  const { session } = req;

  res.render("index", {
    title: "도서관리시스템",
    page: "./pages/addr",
    user: session.user,
  });
});

//로그인
router.post(
  "/signin",
  //중복검사
  function (req, res, next) {
    const { session } = req;

    const { id, pw } = req.body;

    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      }
      let query = `SELECT
          USER_ID,
          USER_PW,
          USER_NAME
        FROM t_users  
        WHERE USER_ID = ?
        AND USER_PW = ?`;
      conn.query(query, [id, pw], (error, result) => {
        if (error) {
          throw error;
        }
        conn.release();
        const [user] = result;

        if (user) {
          session.user = user;
          res.render("index", {
            title: "도서관리시스템",
            page: "./pages/main",
            user: session.user,
          });
          return;
        }

        res.redirect("/users/signin");
      });
    });
  }
);

//회원가입
router.post(
  "/signup",
  //중복검사
  function (req, res, next) {
    const { session } = req;

    const { id, name, pw, recom } = req.body;

    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      }
      let query = "SELECT COUNT(*) as count FROM t_users WHERE USER_ID = ?";
      conn.query(query, [recom], (error, result) => {
        if (error) {
          throw error;
        }
        conn.release();
        const [{ count }] = result;
        if (!count) {
          res.redirect("/users/signup");
          return;
        }
        next();
      });
    });
  },
  //회원가입 등록
  //중복검사후 실행
  (req, res, next) => {
    const { id, name, pw, recom } = req.body;
    let query =
      "INSERT INTO bookstroe.t_users(`USER_ID`, `USER_PW`, `USER_NAME`, `USER_ID_RECOM`) VALUES (?, ?, ?, ?);";
    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      }
      conn.query(query, [id, pw, name, recom], (error, result) => {
        if (error) {
          throw error;
        }
        conn.release();
        if (result) {
          res.redirect("/users/signin");
          return;
        }
        res.redirect("/users/signup");
      });
    });
  }
);
module.exports = router;
