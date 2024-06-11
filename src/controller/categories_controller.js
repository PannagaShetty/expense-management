const e = require("express");
const pool = require("../../db");
const queries = require("../sql/categories_queries");
const enums = require("../utils/enums");

const getAllCategories = async (req, res) => {
  if (req.user.type === enums.userType.user) {
    pool.query(queries.getCategoriesForUser, [req.user.id], (err, result) => {
      if (err) {
        res.status(500).send(err);
        throw err;
      }
      res.status(200).json(result.rows);
    });
  } else {
    pool.query(queries.getAllCategories, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(200).json(result.rows);
    });
  }
};

const getCategoryById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getCategoryById, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(result.rows[0]);
  });
};

const addCategory = async (req, res) => {
  const { name } = req.body;
  pool.query(
    queries.addCategory,
    [name, req.user.type, req.user.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      if (result != null) {
        res.status(200).json(result.rows[0]);
      }
    }
  );
};

const updateCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(
    queries.updateCategory,
    [name, req.user.type, req.user.id, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(200).json(result.rows[0]);
    }
  );
};
const deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.deleteCategory, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(result.rows[0]);
  });
};
module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
