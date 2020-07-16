const express = require('express');

const topicmodel = require('../models/technology.model');

module.exports.getAllTechnology = async (req, res) => {
    try{
        let result = await topicmodel.find({},{technology:1, _id:0}, (err,data)=>{
            if(!err){
                return data;
            }
        });
        result = result.map(ele=> ele.technology).filter((value, index, self) => { 
          return self.map(mapObj => 
            mapObj['type']).indexOf(value['type']) === index;    
        });
        res.status(200).send(result);
      }catch (error){
        console.log('error: ', error);
        res.status(403).send(error.message);
      }
};

module.exports.getTopics = async (req,res)=> {
 
    const temp = {technology: {
      type: req.body.type,
      value: req.body.value
  }};
  const allTopics = await  topicmodel.find({"technology": { type: req.body.type, value: req.body.value} } );

  console.log('data: : : ', allTopics);
  
    // console.log('error', error);

}

// {"technology" : {"value":req.body.value, "type": req.body.type}}