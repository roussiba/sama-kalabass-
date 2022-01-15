const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

const badRequest = class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.message = message;
  }
}

module.exports = badRequest;
