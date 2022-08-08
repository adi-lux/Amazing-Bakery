const Good = require('../models/good')
const Category = require("../models/category");
const {body, validationResult} = require("express-validator")

// name, category, price, stock

//POST: 'goods/'
exports.addGood =
    [body('name').trim().isLength({min: 1}).escape().withMessage('Please enter title'),
     body('price').trim().isLength({min: 1}).escape().isNumeric().withMessage('Please enter valid price'),
     body('stock').trim().isLength({min: 1}).escape().isNumeric().withMessage('Please enter stock'),
     async (req, res, next) => {

         if (!validationResult(req).isEmpty()) {
             const categoryList = await Category.find({}).exec()
             res.render('add_good_form', {title: 'adding good!', categoryList: categoryList})
         } else {
             try {
                 const category = await Category.findOne({name: req.body.category}).exec()
                 await new Good({
                     name: req.body.name,
                     category: category,
                     stock: req.body.stock,
                     price: req.body.price
                 }).save()
                 res.redirect('/goods')
             } catch (e) { return next(e) }
         }
     }]

//GET 'goods/add/'
exports.addGoodForm = async (req, res, next) => {
    //GET FUNCTION -> FORM VIEW USES POST
    try {
        const categoryList = await Category.find({}).exec()
        res.render('add_good_form', {title: 'adding good!', categoryList: categoryList})
    } catch (e) {return next(e)}
}

//GET 'goods/'
exports.getGoods = async (req, res, next) => {
    try {
        const goodList = await Good.find({}).exec()
        res.render('good_list', {title: 'getting goods!', goods: goodList})
    } catch (e) {return next(e)}
}

//GET 'goods/:id'
exports.getGood = async (req, res, next) => {
    try {
        const good = await Good.findById(req.params.id).exec()
        const category = await Category.findById(good.category).exec()
        res.render('good', {title: 'getting good!', good: good, category: category})
    } catch (e) {return next(e)}
}

//POST 'goods/update/:id'
exports.updateGood = [
    body('name').trim().isLength({min: 1}).escape().withMessage('Please enter title'),
    body('price').trim().isLength({min: 1}).escape().isNumeric().withMessage('Please enter valid price'),
    body('stock').trim().isLength({min: 1}).escape().isNumeric().withMessage('Please enter stock'),
    async (req, res, next) => {
        if (!validationResult(req).isEmpty()) {
            const categoryList = await Category.find({}).exec()
            const category = await Category.findOne({name: req.body.category}).exec()
            res.render('update_good_form', {
                title: 'adding good!', name: req.body.name,
                category: category,
                stock: req.body.stock,
                price: req.body.price, categoryList: categoryList
            })
        } else {
            try {
                const category = await Category.findOne({name: req.body.category}).exec()
                await Good.findByIdAndUpdate(req.params.id, {
                    name: req.body.name,
                    category: category,
                    stock: req.body.stock,
                    price: req.body.price
                })
                res.redirect(`/goods/${req.params.id}`)
            } catch (e) { return next(e) }
        }
    }]

//GET 'goods/update/:id'
exports.updateGoodForm = async (req, res, next) => {
    try {
        const categoryList = await Category.find({}).exec()
        const {name, category, price, stock} = await Good.findById(req.params.id).exec()
        res.render('update_good_form', {
            title: 'deleting category!',
            id: req.params.id,
            name: name,
            category: category,
            price: price,
            stock: stock,
            categoryList: categoryList
        })
    } catch (e) { return next(e) }
}

//POST 'goods/delete/:id'
exports.deleteGood = async (req, res, next) => {
    try {
        await Good.findByIdAndDelete(req.params.id)
        res.redirect('/goods')
    } catch (e) { return next(e) }
}