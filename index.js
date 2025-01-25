import express, { response } from 'express';
import { PORT,mongoDBURL } from './config.js';
import mongoose from 'mongoose';

import { Gym } from './models/gyminfoModel.js';

const gymapp=express();

gymapp.use(express.json());

gymapp.get('/',(request,response)=>{
    //console.log(request);
    return response.status(200).send('Welcome to GYM information App');
});

//Route to save new gym info
gymapp.post('/gym',async(request,response)=>{
   try{
    if(!request.body.exerciseTitle || !request.body.load || !request.body.preps)
    {
        return response.status(400).send({
            message:'Send all required fields:exerciseTitle,load,preps',
        });
    }

    const newgyminfo={
      exerciseTitle:request.body.exerciseTitle,
      load:request.body.load,
      preps:request.body.preps,
    }

    const gyminfo=await Gym.create(newgyminfo);

    return response.status(201).send(gyminfo);
   }
   catch(error){
      console.log(error.message);
      response.status(500).send({message:error.message});
   }
})

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    gymapp.listen(PORT,()=>{
        console.log(`App is listening to port:${PORT}`);
    });
  })
.catch((error)=>{
    console.log(error);
});
