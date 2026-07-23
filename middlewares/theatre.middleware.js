const { errorResponseBody } = require("../utils/responsebody");

const validateTheatreCreateRequest = async (req, res, next) => {
  // validate the presence of name
  if (!req.body.name) {
    errorResponseBody.message =
      "The name of the theatre is not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.pincode) {
    errorResponseBody.message =
      "The pincode of the theatre is not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  if (!req.body.city) {
    errorResponseBody.message =
      "The city of the theatre is not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  next();
};


const validateUpdateMovies = (req, res, next) => {

    if (req.body.insert === undefined) {
        errorResponseBody.message = "Insert parameter is missing";
        return res.status(400).json(errorResponseBody);
    }

    if (typeof req.body.insert !== "boolean") {
        errorResponseBody.message = "Insert should be true or false";
        return res.status(400).json(errorResponseBody);
    }

    if (!req.body.movieIds) {
        errorResponseBody.message = "movieIds is missing";
        return res.status(400).json(errorResponseBody);
    }

    if (!Array.isArray(req.body.movieIds)) {
        errorResponseBody.message = "movieIds should be an array";
        return res.status(400).json(errorResponseBody);
    }

    if (req.body.movieIds.length === 0) {
        errorResponseBody.message = "movieIds array cannot be empty";
        return res.status(400).json(errorResponseBody);
    }

   

    next();
};

module.exports = {
  validateTheatreCreateRequest,
  validateUpdateMovies
};
