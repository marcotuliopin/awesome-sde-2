class InvalidParamError extends Error {
    constructor(msg) {
      super(msg);
      this.name = 'InvalidParamError';
    }
  }
  
  module.exports = InvalidParamError;