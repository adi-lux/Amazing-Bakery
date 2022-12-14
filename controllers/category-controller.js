const Category = require('../models/category')
const Good = require('../models/good')
const {body, validationResult} = require("express-validator")
//POST: 'categories/'
exports.addCategory = [
    body('name').trim().isLength({min: 1}).escape().withMessage('Please enter title'),
    body('description').trim().isLength({min: 1}).escape().withMessage('Please enter a description'),
    async (req, res, next) => {
        //req.body.name, req.body.description
        //add category to database
        if (!validationResult(req).isEmpty()) {
            res.render('add_category_form', {title: 'adding category!'})
        } else {
            try {
                await new Category({name: req.body.name, description: req.body.description}).save()
                res.redirect('/categories')
            } catch (e) { return next(e) }
        }
    }]

//GET 'categories/add/'
exports.addCategoryForm =
    async (req, res, next) => {
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
exports.updateCategory = [
    body('name').trim().isLength({min: 1}).escape().withMessage('Please enter title'),
    body('description').trim().isLength({min: 1}).escape().withMessage('Please enter a description'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!validationResult(req).isEmpty()) {
            const {name, description} = await Category.findById(req.params.id).exec()
            res.render('update_category_form', {
                title: 'deleting category!',
                id: req.params.id,
                name: name,
                description: description
            })
        } else
            try {
                await Category.findByIdAndUpdate(req.params.id, {
                    name: req.body.name,
                    description: req.body.description
                })
                res.redirect(`/categories/${req.params.id}`)
            } catch (e) { return next(e) }
    }]

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
        console.log(req.params.id)
        const category = await Category.findById(req.params.id)
        await Good.deleteMany({category: category})
        await Category.findByIdAndDelete(req.params.id)
        res.redirect('/categories')
    } catch (e) {return next(e)}
}