const theatreService = require("../services/theatre.service");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responsebody");

const create = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = 
        "Validation failed on the few parameters  of the request body";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully created the theatre";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Succesfully fetch the data of the theatre";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errorResponseBody.err=error
    return res.status(500).json(errorResponseBody)
  }
};

const destroy=async (req,res)=>{
    try {
        const response=await theatreService.deleteTheatres(req.params.id)
        if(response.err){
            errorResponseBody.err=response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        
        successResponseBody.data=response
        successResponseBody.message="Successfully deleted the theatre"
        return res.status(200).json(successResponseBody)
    } catch (error) {
        console.log(error);
        errorResponseBody.err=error
        return res.status(500).json(errorResponseBody)
        
    }
} 

const updateTheatre=async(req,res)=>{
    try {
        const response=await theatreService.updateTheatre(req.params.id,req.body)
        if(response.err){
            errorResponseBody.err=response.err
            errorResponseBody.message="The update that we are trying to apply does not validate the schema";
            return res.status(response.code).json(errorResponseBody)
             
        }
        successResponseBody.data=response
        return res.status(200).json(successResponseBody)
    } catch (error) {
        console.log(error);
        errorResponseBody.err=error
        return res.status(500).json(errorResponseBody)
        
    }
}

const getAllTheatres=async(req,res)=>{
    try {
        const response=await theatreService.getAllTheatres()
       if(response.err){
        errorResponseBody.err=response.err
        return res.status(response.code).json(errorResponseBody)
       }
       successResponseBody.data=response
       successResponseBody.message="Successfully fetched all the theatres details"
       return res.status(200).json(successResponseBody)
    } catch (error) {
        console.log(error);
        errorResponseBody.err=error
        return res.status(500).json(errorResponseBody)
        
    }
}


const updateMovies=async(req,res)=>{
  try {
    const response=await theatreService.updateMoviesInTheatres(
      req.params.id,
      req.body.movieIds,
      req.body.insert
    )
    if(response.err){
      errorResponseBody.err=response.err
      return res.status(response.code).json(errorResponseBody)
    }
    successResponseBody.data=response
    successResponseBody.message="Successfully updated movies in the theatre"
    return res.status(200).json(successResponseBody)
  } catch (error) {
    console.log(error);
    errorResponseBody.err=error
    return res.status(500).json(errorResponseBody)
    
  }
}



module.exports = {
  create,
  getTheatre,
  destroy,
  updateTheatre,
  getAllTheatres,
  updateMovies
};
