const CustomAPIError = require('./custom-api').default;
const UnauthenticatedError = require('./unauthenticated').default;
const NotFoundError = require('./not-found').default;
const BadRequestError = require('./bad-request').default;
const UnauthorizedError = require('./unauthorized').default;
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
};
