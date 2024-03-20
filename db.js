const { connect } = require('http2');
const mongoose=require('mongoose');

//define the mongodb Connection URL
//replace my database with your database name  
const mongoURL = 'mongodb://localhost:27017/hotels'

//set mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db=mongoose.connection;

//define event listener for database connection

db.on('connected',()=>{
    console.log('connected to mongodb server');
});


db.on('error',(err)=>{
    console.log('mongodb connection error',err);
}); 


db.on('disconnected',()=>{
    console.log('mongodb disconnect');
});

//export the database connection 
module.exports =db;