const mongoose = require("mongoose");

const tutorSchema = mongoose.Schema({
    name  :String,
    education : String,
    gender : String,
    age : Number,
    email : String,
    password : String
   
   

})

const TutorModel = mongoose.model("tutor",tutorSchema);

module.exports={
    TutorModel
}