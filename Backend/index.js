const express=require('express');
const mongoose=require('mongoose');
const userRoute = require('./routes/userRoute');
const cors=require('cors');
require('dotenv').config();

const app=express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',userRoute);

const URI=`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.zuk6h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(URI)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(8080,(err)=>{
        console.log("Server is running");
    })
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});
