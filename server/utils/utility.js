'use strict'

const bcrypt = require ('bcrypt');


const generateHash = async (password) => {
    try{
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        return hashedPassword;
    } catch(err){
        throw err;
    }
}

module.exports = {
    generateHash
}