const Theatre = require("../models/theatre.model");

const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return {
        err: err,
        code: 422,
      };
    }
    console.log(error);
    throw error;
  }
};

const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      // no record found
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteTheatres = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      return {
        err: "No record of a theatre found for  the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return {
        err: "No theatre",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      const err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return {
        err: err,
        code: 422,
      };
    }
    throw error;
  }
};

const getAllTheatres = async (data) => {
  try {
    const query = {};

    if (data?.city) {
      query.city = data.city;
    }

    if (data?.pincode) {
      // check pincode is present in the query parameter  or not
      query.pincode = data.pincode;
    }

    if (data?.name) {
        query.name=data.name
    }
    // // if we have data arranged in the order offset tell us that from what record number,we should start returning the data
    const pagination = {};

    if (data && data?.limit) {
      pagination.limit = data.limit
    }

    if (data && data?.skip) {
      let perPage = (data.perPage) ? data.perPage: 3;
      pagination.skip = data.skip * perPage;
    }

    const response = await Theatre.find(query, {}, pagination);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
  const theatre = await Theatre.findById(theatreId);

  if (!theatre) {
    return {
      err: "No such theatre found for the given theatre id",
      code: 404,
    };
  }

  if (insert) {
    movieIds.forEach((movieId) => {
      const exists = theatre.movies.some(
        (id) => id.toString() === movieId.toString(),
      );

      if (!exists) {
        theatre.movies.push(movieId);
      }
    });
  } else {
    theatre.movies = theatre.movies.filter(
      (movie) => !movieIds.some((id) => id.toString() === movie.toString()),
    );
  }

  await theatre.save();

  return theatre.populate("movies");
};

module.exports = {
  createTheatre,
  getTheatre,
  deleteTheatres,
  updateTheatre,
  getAllTheatres,
  updateMoviesInTheatres,
};
