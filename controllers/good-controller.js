const Good = require('../models/good')

//POST: 'goods/'
exports.addGood = (req, res, next) => {
    res.redirect('/')
}

//GET 'goods/add/'
exports.addGoodForm = (req, res, next) => {
    //GET FUNCTION -> FORM VIEW USES POST
    res.render('add_good_form', {title: 'adding good!'})
}

//GET 'goods/'
exports.getGoods = (req, res, next) => {
    res.render('good_list', {title: 'getting goods!'})
}

//GET 'goods/:id'
exports.getGood = (req, res, next) => {
    res.render('good', {title: 'getting good!'})
}

//POST 'goods/update/:id'
exports.updateGood = (req, res, next) => {
    res.redirect('/')
}

//GET 'goods/update/:id'
exports.updateGoodForm = (req, res, next) => {
    res.render('update_good_form', {title: 'deleting good!'})
}

//POST 'goods/delete/:id'
exports.deleteGood = (req, res, next) => {
    res.redirect('/')
}

//GET 'goods/delete/:id'
exports.deleteGoodForm = (req, res, next) => {
    res.render('delete_good_form', {title: 'deleting good!'})
}