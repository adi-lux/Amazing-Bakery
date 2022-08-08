const express = require('express');
const categoryController = require('../controllers/category-controller')
const router = express.Router();

router.post('/', categoryController.addCategory) // C
router.get('/add/', categoryController.addCategoryForm) // C
router.get('/', categoryController.getCategories); // R
router.get('/:id', categoryController.getCategory) // R
router.post('/update/:id', categoryController.updateCategory) // U
router.get('/update/:id', categoryController.updateCategoryForm) // U
router.post('/delete/:id', categoryController.deleteCategory) // D
router.get('/delete/:id', categoryController.deleteCategoryForm) // D

module.exports = router;