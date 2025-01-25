import mongoose from "mongoose";

const gymSchema=mongoose.Schema(
    {
      exerciseTitle:{
        type:String,
        required:true,
      },
      load:{
        type:Number,
        required:true,
      },
      preps:{
        type:Number,
        required:true,
      },
  },
  {
    timestamps:true,
  }
);

export const Gym=mongoose.model('gyminfo',gymSchema);