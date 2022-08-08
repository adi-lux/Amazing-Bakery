const Category = require('../models/category')

//POST: 'categories/'
exports.addCategory = (req, res, next) => {
    res.redirect('/')
    console.log('added category.')
}

//GET 'categories/add/'
exports.addCategoryForm = (req, res, next) => {
    //GET FUNCTION -> FORM VIEW USES POST
    res.render('add_category_form', {title: 'adding category!'})
}

//GET 'categories/'
exports.getCategories = (req, res, next) => {
    res.render('category_list', {title: 'getting categories!'})
}

//GET 'categories/:id'
exports.getCategory = (req, res, next) => {
    res.render('category', {title: 'getting category!'})
}

//PUT 'categories/'
exports.updateCategory = (req, res, next) => {
    res.redirect('/')
    console.log('updated category.')
}

//GET 'categories/update/:id'
exports.updateCategoryForm = (req, res, next) => {
    res.render('update_category_form', {title: 'deleting category!'})
}

//DELETE 'categories/:id'
exports.deleteCategory = (req, res, next) => {
    console.log('deleted category.')
    res.redirect('/')
}

//GET 'categories/delete/:id'
exports.deleteCategoryForm = (req, res, next) => {
    res.render('delete_category_form', {title: 'deleting category!'})
}