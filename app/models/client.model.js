const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ClientSchema = mongoose.Schema({
 nickname: {
    type: String,
    index: true,
    unique: true,
    required: true,
    trim: true,
    minlength: 4
 },
 password:{
    type: String,
    required: true,
    minlength: 4
 },
 email: {
    type: String,
    unique: true,
    required: true

 },
 address: {
    type: String
 },
 phone: {
    type: String
 }
}, {
 timestamps: true
});


module.exports = mongoose.model('Client', ClientSchema);
