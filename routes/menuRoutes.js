const express = require('express');
const router = express.Router();

const menuItem = require('./../models/menuItem');

//get method to get  menu item
router.get('/', async(req,res)=>{
    try{
       const data=await menuItem.find();
       console.log("data fetched");
       res.status(200).json(data);

    }catch(err){
       console.log(err);
       res.status(500).json({error:"internal server error"});
    }
})

//post method to add menu item
router.post('/',async (req,res)=>{
    
   try{
     const data= req.body;

     const newmenuItem= new menuItem(data);
     const response= await newmenuItem.save();
     console.log("data saved");
     res.status(200).json(response);

   }catch(err){
      console.log(err);
      res.status(500).json({error:"internal server error"});
   }
});


//update method to update menu item

router.put('/:id', async (req,res)=> {

   try{
         const menuId =req.params.id; // extract the id from the url parameter
         const updated_menu_Data = req.body; //extract the data from the request body
          
         const response = await menuItem.findByIdAndUpdate(menuId,updated_menu_Data,{
             new:true,  //return the updated document
             runValidators:true // Run mongoose validation
         });

         if(!response){
             return res.status(404).json({error:"menu not found"});
         }
         console.log("data updated");
         res.status(200).json(response); //send the updated document as a response
     }catch(err){
      
         console.log(err);
         res.status(500).json({error:"Internal server error"});
     }
   });

//delete method to delete menu item
router.delete('/:id', async (req,res)=> {

   try{
         const menuId =req.params.id; // extract the id from the url parameter
       
          
         const response = await menuItem.findByIdAndRemove(menuId);

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