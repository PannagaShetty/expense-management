const express = require("express");
const categories = require("./src/categories/categories_routes.js");
const app = express();
const pool = require("./db");
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
    res.send("This is a Expense Management Api!");
})

app.use("/api/v1/categories", categories);

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
