const Movie = require("../models/movie.model");
const movieService = require("../services/movie.service");
const {successResposneBody,errorResposneBody}=require("../utils/responsebody")

const createMovie = async (req, res) => {
  try {
    const response = await movieService.createMovie(req.body);
    if(response.err){
        errorResposneBody.err=response.err
        errorResposneBody.code=response.code
        errorResposneBody.code="Validation failed on few parameter of the request body"
        return res.status(response.code).json(errorResposneBody)
    }

    successResposneBody.data = movie;
    successResposneBody.message="Successfully created the movie"
    return res.status(201).json(successResposneBody);
  } catch (err) {
    console.log(err.name);
    return res.status(500).json(errorResposneBody);
  }
};


const deleteMovie = async (req, res) => {
  try {
    const response = await movieService.deleteMovie(req.params.id);

    successResposneBody.data = response;
    successResposneBody.message="Successfully deleted the movie"
    return res.status(200).json(successResposneBody);
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResposneBody);
  }
};


const getMovie = async (req, res) => {
  try {
    const response = await movieService.getMovieById(req.params.id);

    if (response.err) {
      errorResposneBody.err = response.err;

      return res.status(response.code).json(errorResposneBody);
    }

    successResposneBody.data = response;
    successResposneBody.message="Sucesfully fetched the movie details "
    return res.status(200).json(successResposneBody);
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResposneBody);
  }
};

module.exports = {
  createMovie,
  getMovie,
  deleteMovie,
};
