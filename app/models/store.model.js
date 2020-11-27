const mongoose = require('mongoose');
const StoreSchema = mongoose.Schema({
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
 }
}, {
 timestamps: true
});
module.exports = mongoose.model('Store', StoreSchema);