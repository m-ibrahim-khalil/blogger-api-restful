'use strict'
const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../configs/db.config');
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
    },
    coverImageURL: {
        type: DataTypes.TEXT,
      },
}, {sequelize});

module.exports = Story;