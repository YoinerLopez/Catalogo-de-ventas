const mongoose = require('mongoose');
const ShopSchema = mongoose.Schema({
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
 nit:{
   type: String,
   trim: true,
},
address:{
   type: String,
   trim: true,
},
phone:{
   type: String,
   trim: true,
}
}, {
 timestamps: true
});
module.exports = mongoose.model('Shop', ShopSchema);