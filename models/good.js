const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodSchema = new Schema({
    name: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    price: Number,
    stock: Number,
})

goodSchema
    .virtual('url')
    .get(function () {return `goods/${this.id}`})

module.exports = mongoose.model('Good', goodSchema)