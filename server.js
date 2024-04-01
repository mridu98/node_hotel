const express= require('express')

const app = express();
const db=require('./db')

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const Person= require('./models/Person');
const menuItem =require('./models/menuItem');


app.get('/',(req,res)=>{
    res.send('welcome to my hotel ,how can i help you:');
});
 
//import the router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');

//use the router files
app.use('/person',personRoutes);
app.use('/menuItem',menuRoutes);


app.listen(4000,()=>{
    console.log("server is running");
});