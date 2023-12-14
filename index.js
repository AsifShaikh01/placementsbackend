const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const studentAuthRoutes = require('./routes/StudentRoute');
const tutorAuthRoutes = require('./routes/TutorAuthRoutes');
const questionRoutes = require('./routes/QuestionRoutes');
// const { authStudent } = require('./middlewares/authMiddleware');
// const { connection } = require('./config/db'); 

const app = express();
const connection = mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(cors());
app.use('/student', studentAuthRoutes);
app.use('/tutor', tutorAuthRoutes);
app.use('/questions', questionRoutes);


app.listen(process.env.PORT , async()=>{
    try {
        await connection;
        console.log("connected to the database!!")
        
    } catch (error) {
        console.log("can't connect")
    }
    console.log(`server is running at port ${process.env.PORT}`)
})