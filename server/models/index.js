const User = require('./User');
const Story = require('./Story');
const sequelize = require('../connectDb');

User.hasMany(Story, { foreignKey: 'authorId', onDelete: 'CASCADE' });
Story.belongsTo(User, { as: 'author' });

(async () => {
  await sequelize.sync({ force: true }); // { force: true }
})();

module.exports = {
  User,
  Story,
};
