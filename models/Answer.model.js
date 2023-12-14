const mongoose = require("mongoose");
const { type } = require("os");

const answerSchema = mongoose.Schema({
   answer : String,
   date : Date,
   questionId : {type :mongoose.Schema.Types.ObjectId , ref : "Question"},
   tutorId : {type :mongoose.Schema.Types.ObjectId , ref : "Tutor"},

   
   

})

const AnswerModel = mongoose.model("answer",answerSchema);

module.exports={
    AnswerModel
}