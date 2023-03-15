'use strict'
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connectDb');

class Story extends Model {}

Story.init({
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
    authorId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    }
}, {sequelize});

(async () => {
    await sequelize.sync({ force: false });     //{ force: true }
})();

module.exports = Story;