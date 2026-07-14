
const errorResposneBody = {
  err: {},
  data: {},
  message: "Something went wrong,cannot process the request",
  success: false,
};
const successResposneBody = {
  err: {},
  data: {},
  message: "Successfully process the request",
  success: true,
};

module.exports={
    errorResposneBody,
    successResposneBody
}