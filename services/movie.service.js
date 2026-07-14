const Movie = require("../models/movie.model");

const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;

  } catch (error) {

    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return { err: err, code: 422 };
    }
    else{
        throw error;
    }
  }
};
const deleteMovie = async (id) => {
  const response = await Movie.findByIdAndDelete(id);
  return response;
};

const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
  // console.log(movie);

  if (!movie) {
    return {
      err: "No movie found for corresponding id provided",
      code: 404,
    };
  }
  return movie;
};

module.exports = {
  getMovieById,
  createMovie,
  deleteMovie,
};
