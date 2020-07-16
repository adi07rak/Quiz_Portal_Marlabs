const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = new Schema({
    traineeId: {type: String, unique: true, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    recruiterName: {type: String, required: true},
    devDomain: {type: String, required: true},
    password: {type: String, required: true},
    resetLink: {data: String, default: ''}
});

module.exports = mongoose.model('users',userSchema);