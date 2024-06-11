const getAllCategories = "SELECT * FROM categories";
const getCategoriesForUser = "SELECT id, name, added_by FROM categories WHERE added_by = 'ADMIN' OR (added_by = 'USER' AND user_id = $1);";
const getCategoryById = "SELECT * FROM categories WHERE id = $1";
const addCategory = "INSERT INTO categories (name, added_by, user_id) VALUES ($1, $2, $3) RETURNING *";
const updateCategory = "UPDATE categories SET name = $1, added_by = $2, user_id = $3 WHERE id = $4 RETURNING *";
const deleteCategory = "DELETE FROM categories WHERE id = $1 RETURNING *";

module.exports = {getAllCategories, getCategoriesForUser, getCategoryById, addCategory, updateCategory, deleteCategory};