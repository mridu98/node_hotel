const express= require('express');
const router = express.Router();

const Person= require('./../models/Person');
//post route and the person details
router.post('/', async (req,res)=>{
    
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
router.get('/', async (req,res)=>{
    try {
        const data= await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
});

//parameterized get request of person(end points)
router.get('/:workType', async (req,res)=>{
     
    try {
        const workType = req.params.workType;
        
        if(workType =='chef' || workType =='waiter' || workType =='manager'){
           
            const response = await Person.find({work:workType});
            console.log("response fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404),json({error:'Invalid work type'});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal server error"});    
    }
});


router.put('/:id', async (req,res)=> {

      try{
            const personId =req.params.id; // extract the id from the url parameter
            const updatedPersonData = req.body; //extract the data from the request body
             
            const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
                new:true,  //return the updated document
                runValidators:true // Run mongoose validation
            });
 
            if(!response){
                return res.status(404).json({error:"Person not found"});
            }
            console.log("data updated");
            res.status(200).json(response); //send the updated document as a response
        }catch(err){
         
            console.log(err);
            res.status(500).json({error:"Internal server error"});
        }
      });

//

router.delete('/:id', async (req,res)=> {

    try{
          const personId =req.params.id; // extract the id from the url parameter
        
           
          const response = await Person.findByIdAndRemove(personId);

          if(!response){
              return res.status(404).json({error:"Person not found"});
          }
          console.log("data deleted");
          res.status(200).json({mess:"Person deleted successfully"}); 
      }catch(err){
       
          console.log(err);
          res.status(500).json({error:"Internal server error"});
      }
    });

module.exports = router;
