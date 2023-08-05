const CustomAPIError = require("./custom-api-error");
const BadRequest = require("./bad-request");
const NotFound = require("./not-found");
const Unautorized = require("./unautorized");
const Unauthenticated = require("./unauthenticated");

module.exports = {
  CustomAPIError,
  BadRequest,
  NotFound,
  Unautorized,
  Unauthenticated,
};
