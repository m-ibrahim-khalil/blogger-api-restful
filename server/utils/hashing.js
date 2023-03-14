'use strict'

const bcrypt = require ('bcrypt');


const generateHashPassword = async (password) => {
    try{
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        return hashedPassword;
    } catch(err){
        throw err;
    }
}

const comparePassword = async (password, hashedPassword) => {
    const isCorrect = await bcrypt.compare(password, hashedPassword);
    return isCorrect;
}

module.exports = {
    generateHashPassword,
    comparePassword
}