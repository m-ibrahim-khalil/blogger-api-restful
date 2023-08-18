const User = require('./User');
const Story = require('./Story');
const {connectToDb, sequelize} = require('../configs/db.config');

User.hasMany(Story, { foreignKey: 'authorId', onDelete: 'CASCADE' });
Story.belongsTo(User, { as: 'author' });

(async () => {
  await sequelize.sync(); // { force: true }
  console.log('The table for the User model was just (re)created!');
  await connectToDb();
})();

module.exports = {
  User,
  Story,
};
