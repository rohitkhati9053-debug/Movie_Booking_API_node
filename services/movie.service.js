const Movie = require("../models/movie.model");

const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    if (error.name === "ValidationError") {
      const err = {};

      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });

      return {
        err,
        code: 422,
      };
    }

    throw error;
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

const updateMovie = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return movie;
  } catch (error) {
    if (error.name === "ValidationError") {
      const err = {};

      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });

      return {
        err,
        code: 422,
      };
    }

    throw error;
  }
};

module.exports = {
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
};
