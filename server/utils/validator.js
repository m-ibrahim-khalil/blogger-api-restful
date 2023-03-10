"use strict";

const emailValidator = require("email-validator");

class Validator {
  constructor() {}

  validateUsename(username){
    if(/^[a-zA-Z0-9]+$/.test(username)) return true;
    return false;
  }

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