const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name  :String,
    classValue : Number,
    grade : String,
    age : Number,
    email : String,
    password : String
   
   

})

const StudentModel = mongoose.model("student",studentSchema);

module.exports={
    StudentModel
}