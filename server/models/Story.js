const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connectDb');
const User = require('./User');

class Story extends Model {}

Story.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

User.hasMany(Story, { foreignKey: 'authorId' });
Story.belongsTo(User, { as: 'author' });

(async () => {
  await sequelize.sync({ force: false }); // { force: true }
})();

module.exports = Story;
