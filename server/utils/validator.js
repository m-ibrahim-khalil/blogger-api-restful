"use strict";
const emailValidator = require("email-validator");

class Validator {
  constructor() {}

  validateEmail(email){
    if(emailValidator.validate(email)) return true;
    return false;
  }

  checkEmptyArray(arr){
    if(arr.length === 0) return true;
    return false;
  }
}

module.exports = new Validator();