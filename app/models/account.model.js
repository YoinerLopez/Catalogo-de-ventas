const mongoose = require('mongoose');
const AccountSchema = mongoose.Schema({
    idclient:{
        type:String,
        index:true,
        unique:true,
        requered: true,
        minlength: 3
    },
    money: {
        type: Number,
        requered: true
     },
     debt: {
        type: Number,
        requered: true
     }
}, {
 timestamps: true
});
module.exports = mongoose.model('Account', AccountSchema);