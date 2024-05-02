const mongoose = require('mongoose');

const tmsdbSchema = new mongoose.Schema({
    fname: String,
    mname: String,
    lname: String,
    gender: String,
    dob: Date,
    email: String,
    password: String,
    confirmPassword: String,
})

const TmsModel = mongoose.model("tms", tmsdbSchema)
module.exports = TmsModel
