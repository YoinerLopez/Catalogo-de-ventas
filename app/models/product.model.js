const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
 name: {
    type: String,
    index: true,
    unique: true,
    required: true,
    trim: true,
    minlength: 4
 },
 content:{
    type: String,
    required: true,
    trim: true,
    minlength: 4
 },
 stock: {
    type: Number,
    min: 1
 },
 price: {
    type: Number,
    min: 10
 },
 urlphoto: {
    type: String,
    required: true,
    minlength:4
 },
 idshop: {
    type: String,
    required: true
 }
}, {
 timestamps: true
});
module.exports = mongoose.model('Product', ProductSchema);
