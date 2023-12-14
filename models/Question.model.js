const mongoose = require("mongoose");


const questionSchema = mongoose.Schema({
   question : String,
   date : Date,
   subject : String,
   studentId : {type :mongoose.Schema.Types.ObjectId , ref : "Student"},
   answers :  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
   answered : { type: Boolean, default: false },
   

})

const QuestionModel = mongoose.model("question",questionSchema);

module.exports={
    QuestionModel
}