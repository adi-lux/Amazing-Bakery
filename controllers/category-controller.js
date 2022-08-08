const Category = require('../models/category')
const Good = require('../models/good')

//POST: 'categories/'
exports.addCategory = async (req, res, next) => {
    //req.body.name, req.body.description
    //add category to database
    try {
        await new Category({name: req.body.name, description: req.body.description}).save()
        res.redirect('/categories')
    } catch (e) { return next(e) }
}

//GET 'categories/add/'
exports.addCategoryForm = async (req, res, next) => {
    try {
        res.render('add_category_form', {title: 'adding category!'})

    } catch (e) {return next(e)}
}

//GET 'categories/'
exports.getCategories = async (req, res, next) => {
    try {
        const category_list = await Category.find({}).exec()
        res.render('category_list', {title: 'getting categories!', categories: category_list})
    } catch (e) { return next(e) }
}

//GET 'categories/:id'
exports.getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id).exec()
        const goodList = await Good.find({category: req.params.id}).exec()
        res.render('category', {title: 'getting category!', category: category, goods: goodList})
    } catch (e) {return next(e)}
}

//POST 'categories/update/:id'
exports.updateCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description
        })
        res.redirect(`/categories/${req.params.id}`)
    } catch (e) { return next(e) }
}

//GET 'categories/update/:id'
exports.updateCategoryForm = async (req, res, next) => {
    // get stuff
    try {
        const {name, description} = await Category.findById(req.params.id).exec()
        res.render('update_category_form', {
            title: 'deleting category!',
            id: req.params.id,
            name: name,
            description: description
        })
    } catch (e) { return next(e) }
}

//POST 'categories/delete/:id'
exports.deleteCategory = async (req, res, next) => {
    try {
        await Good.deleteMany({category: req.params.id})
        await Category.findByIdAndDelete(req.params.id)
        res.redirect('/categories')
    } catch (e) {return next(e)}
}

//GET 'categories/delete/:id'
exports.deleteCategoryForm = async (req, res, next) => {
    try {
        res.render('delete_category_form', {title: 'deleting category!'})
    } catch (e) {return next(e)}
}