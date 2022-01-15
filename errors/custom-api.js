const customApi = class CustomAPIError extends Error {
    constructor(message) {
      super(message)
    }
  }
  
module.exports = customApi
  