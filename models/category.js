const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: String,
    description: String,
})

CategorySchema.virtual('url')
              .get(function () {return `categories/${this.id}`})

exports.default = mongoose.model('category', CategorySchema)