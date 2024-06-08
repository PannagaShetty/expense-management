const {Router}=require('express');
const controller=require('./categories_controller');
const router=Router();

router.get('/',controller.getAllCategories)
router.get('/getForUser',controller.getCategoriesForUser)
router.get('/:id',controller.getCategoryById)
router.post('/',controller.addCategory)
router.put('/:id',controller.updateCategory)
router.delete('/:id',controller.deleteCategory)
module.exports=router;