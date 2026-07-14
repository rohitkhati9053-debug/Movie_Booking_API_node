const badRequestResponse={
    sucess:false,
        err:"",
        data:{},
        message:"Malformed request | Bad request"
}
const validateMovieCreateRequest=async(req,res,next)=>{
// validate the movie name 
if(!req.body.name){
    badRequestResponse.err="The name of the movie is not present in request sent"
    return res.status(400).json(badRequestResponse)
}
if(!req.body.description){
    badRequestResponse.err="The description of the movie is not present in request"
    return res.status(400).json(badRequestResponse)
}

if (!Array.isArray(req.body.casts) || req.body.casts.length===0) {
    badRequestResponse.err = "The casts of the movie is not present in request";
    return res.status(400).json(badRequestResponse);
}

if(!req.body.trailerUrl){
    badRequestResponse.err="The trailer url of the move is not present in request";
    return res.status(400).json(badRequestResponse)
}

if(!req.body.director){
    badRequestResponse.err="The director of the move is not present in request";
    return res.status(400).json(badRequestResponse)
}

if(!req.body.releaseDate){
    badRequestResponse.err="The releaseDate  of the move is not present in request";
    return res.status(400).json(badRequestResponse)
}
next()

}


module.exports={
validateMovieCreateRequest
}