const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api-error");

class Unautorized extends CustomAPIError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unautorized;
