const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShoppingSchema = Schema({
 idclient:{
    type: String,
    requered: true
 },
 idproducts:[{
   type: Schema.Types.ObjectId,
   trim: true,
   required: true
 }],
 quantities:[{
   type: Number,
   trim: true,
   min : 1,
   required: true
 }],
 status: {
    type: String,
    required: true,
    trim: true,
 },
 resulted: {
   type: Number,
   required:true,
   min: 0
 }
}, {
 timestamps: true
});
module.exports = mongoose.model('Shopping', ShoppingSchema);
