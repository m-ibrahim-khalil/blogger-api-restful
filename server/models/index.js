const User = require('./User');
const Story = require('./Story');
const sequelize = require('../connectDb');

User.hasMany(Story, { foreignKey: 'authorId' });
Story.belongsTo(User, { as: 'author' });

(async () => {
  await sequelize.sync({ force: false }); // { force: true }
})();

module.exports = {
  User,
  Story,
};
