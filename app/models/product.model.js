const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
 name: {
    type: String,
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
 price: {
    type: Number
 },
 urlphoto: {
    type: String,
    required: true,
    minlength:4
 },
 discount: {
   type: Number
},
 idstore: {
    type: String,
    minlength: 4,
    required: true
 }
}, {
 timestamps: true
});
module.exports = mongoose.model('Product', ProductSchema);
