const Theatre=require("../models/theatre.model")

const createTheatre=async (data)=>{
    try {
        const response=await Theatre.create(data)
        return response
        
    } catch (error) {
        if(error.name==="ValidationError"){
            let err={}
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message
            })
            return {
                err:err,
                code:422
            }
        }
        console.log(error);
        throw error
        
    }
}

const getTheatre=async(id)=>{
    try {
        const response=await Theatre.findById(id)
        if(!response){
            // no record found
            return {
                err:'No theatre found for the given id',
                code:404
            }
        }
        return response
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

const deleteTheatres=async(id)=>{
   try {
     const response=await Theatre.findByIdAndDelete(id)
     if(!response){
        return {
            err:"No record of a theatre found for  the given id",
            code :404
        }
     }
     return response
   } catch (error) {
    console.log(error);
    throw error
    
   }
}

const updateTheatre=async (id,data)=>{
  try {
    const theatre=await Theatre.findByIdAndUpdate(id,data,{
        new:true,
        runValidators:true
    })
    return theatre
  } catch (error) {
    if(error.name==="ValidationError"){
        const err={}
        Object.keys(error.errors).forEach((key)=>{
            err[key]=error.errors[key].message
        })
        return {
            err:err,
            code:422
        }
    }
    throw error;
  }
}

const getAllTheatres=async(filter)=>{
    try {
        const theatres=await Theatre.find({})
    return theatres;
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

//   let query={}
    // if(filter.name){
    //     query.name=filter.name
    // }
    // let movies=await Movie.find(query)
    // if(!movies){
    //     return {
    //         err:"Not able to find the query movies",
    //         code:404
    //     }
    // }


module.exports={
    createTheatre,
    getTheatre,
    deleteTheatres,
    updateTheatre,
    getAllTheatres
}