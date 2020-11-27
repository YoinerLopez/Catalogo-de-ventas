const mongoose = require('mongoose');
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
    required: true
 },
 email: {
    type: String,
    required: true
 },
 address: {
    type: String,
    required: true
 },
 phone: {
    type: String,
    required: true
 }
}, {
 timestamps: true
});
module.exports = mongoose.model('Client', ClientSchema);
