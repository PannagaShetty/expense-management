const express = require("express");
const app = express();
const pool = require("./db");
app.use(express.json());
const port = 3000;

app.get("/", function (req, res) {
  pool.query('SELECT * FROM "user";', (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result.rows);
  });
});


pool
  .connect()
  .then(() => {
    app.listen(port, () => {
      return console.log(`Example app listening on port ${port}!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
