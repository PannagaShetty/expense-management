const pool = require("../../db");
const queries = require("../sql/users_queries");
const enums = require("../utils/enums");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const login = async (req, res) => {
  const { email, password } = req.body;
  pool.query(queries.login, [email], async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(result.rows);
    if (result.rows.length > 0) {
      bcrypt.compare(password, result.rows[0].password, (err, response) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        if (response) {
          const user = {
            id: result.rows[0].id,
            email: result.rows[0].email,
            user_name: result.rows[0].user_name,
            type: result.rows[0].type,
          };

          const accesToken = jwt.sign(
            { user },
            process.env.ACCESS_TOKEN_SECRET,
            function (err, token) {
              if (err) return res.status(500).send(err);
              res.status(200).json({ token: token, user: user });
            }
          );
        } else {
          res.status(401).send("Invalid Password");
        }
      });
    } else {
      res.status(401).send("Email does not exist");
    }
  });
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    pool.query(
      queries.signup,
      [username, email, hashedPassword, userType.user],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        res.status(200).json(result.rows[0]);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { login, signup };
