 const pool = require('../../db');
 const queries =require('./categories_queries');
 const getAllCategories = async (req, res) => {     
    pool.query(queries.getAllCategories, (err, result) => {
    if (err) {
        console.log(err);
        throw err;
    }
    res.status(200).json(result.rows);
})
}
const getCategoriesForUser = async (req, res) => {
        pool.query(queries.getCategoriesForUser,[2], (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json(result.rows);
    })
}

const getCategoryById = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCategoryById, [id], (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json(result.rows);
    })
}

const addCategory = async (req, res) => {
    const {name, added_by, user_id} = req.body;
    pool.query(queries.addCategory, [name, added_by, user_id], (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json(result.rows);
    })
}

const updateCategory = async (req, res) => {
    const id = parseInt(req.params.id);
    const {name, added_by, user_id} = req.body;
    pool.query(queries.updateCategory, [name, added_by, user_id, id], (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json(result.rows);
    })

}
const deleteCategory = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteCategory, [id], (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json(result.rows);
    })
}
module.exports = {getAllCategories, getCategoriesForUser, getCategoryById, addCategory, updateCategory, deleteCategory};