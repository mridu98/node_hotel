const express= require('express')

const app = express();
const db=require('./db')

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const Person= require('./models/Person');


app.get('/',(req,res)=>{
    res.send('welcome to my hotel ,how can i help you:');
});

app.post('/person', async (req,res)=>{
     
    // const data= req.body;  // assuming the request body contain the person date

    // //creating a new person data
    // // const newPerson =  new Person();
    // //   newPerson.name = data.name;
    // //   newPerson.age= data.age;
    // //   newPerson.mobile=data.mobile;

    // const newPerson= new Person(data);
    // //save the new person to the database


    // nowdays we not use .save function-----------
    // newPerson.save((error, saved_Person) =>{
    //     if(error){
    //         console.log("Error saving person date",error);
    //         res.status(500).json({error:'internal server error'})
    //     }
    //     else{
    //         console.log("person date saved");
    //         res.status(200).json({saved_Person});
    //     }

    // })
    
    try {
        const data= req.body;  // assuming the request body contain the person date

        //create a new person doucment using the mongoose model
        const newPerson= new Person(data);
  
        //save the new person to the database
        const response = await newPerson.save();
        
        console.log("data saved");
        res.status(200).json(response);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }


});

//get method to all person
app.get('/person', async (req,res)=>{
    try {
        const data= await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
});
  
app.listen(4000,()=>{
    console.log("server is running");
});