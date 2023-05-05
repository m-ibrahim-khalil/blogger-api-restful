'use strict'
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connectDb');
const User = require('./User')

class Story extends Model {}

Story.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },

    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {sequelize});

module.exports = Story;