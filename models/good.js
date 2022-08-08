const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodSchema = new Schema({
    name: String,
    category: {type: 'ObjectId', ref: 'Category'},
    price: Number,
    stock: Number,
})

goodSchema
    .virtual('url')
    .get(function () {return `items/${this.id}`})

exports.default = mongoose.model('good', goodSchema)