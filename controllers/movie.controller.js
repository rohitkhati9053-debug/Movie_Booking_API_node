const Movie = require("../models/movie.model");
const movieService = require("../services/movie.service");
const {successResponseBody,errorResponseBody}=require("../utils/responsebody")

const createMovie = async (req, res) => {
  try {
    const response = await movieService.createMovie(req.body);
    if(response.err){
        errorResponseBody.err=response.err
        errorResponseBody.code=response.code
        errorResponseBody.code="Validation failed on few parameter of the request body"
        return res.status(response.code).json(errorResponseBody)
    }

    successResponseBody.data = movie;
    successResponseBody.message="Successfully created the movie"
    return res.status(201).json(successResponseBody);
  } catch (err) {
    console.log(err.name);
    return res.status(500).json(errorResponseBody);
  }
};


const deleteMovie = async (req, res) => {
  try {
    const response = await movieService.deleteMovie(req.params.id);

    successResponseBody.data = response;
    successResponseBody.message="Successfully deleted the movie"
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponseBody);
  }
};


const getMovie = async (req, res) => {
  try {
    const response = await movieService.getMovieById(req.params.id);

    if (response.err) {
      errorResponseBody.err = response.err;

      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message="Sucesfully fetched the movie details "
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponseBody);
  }
};

module.exports = {
  createMovie,
  getMovie,
  deleteMovie,
};
