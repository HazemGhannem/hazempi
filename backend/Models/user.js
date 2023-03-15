const mongoose = require ('mongoose')

const RoleSchema = new mongoose.Schema({

    name : {type : String , required : true , default : "userRole"}
})

const UserSchema = new mongoose.Schema({
    email : {type : String , required:true, unique: true},
    lastName: {type: String,},
    firstName: {type:String,},
    cin: {type:Number,},
    password: {type:String,},
    phone: {type:String,} ,
    dateOfBirth: {type:Date,},
    imageUrl: {type:String},
    createdAt: {type:Date, default: Date.now},
    bloque: {type:Boolean, default: false},
    verify: {type:Boolean, default: false},
    emailToken:{ type: String},
    role :RoleSchema,
    status: {
        type: String,enum: ['pending', 'approved', 'rejected'],default: 'pending'
    },
    


})
module.exports = mongoose.model('User', UserSchema)