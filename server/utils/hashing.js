const bcrypt = require('bcrypt');

const generateHashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT, 10)
  );
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const isCorrect = await bcrypt.compare(password, hashedPassword);
  return isCorrect;
};

module.exports = {
  generateHashPassword,
  comparePassword,
};
