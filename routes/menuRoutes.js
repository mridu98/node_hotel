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


module.exports = router;