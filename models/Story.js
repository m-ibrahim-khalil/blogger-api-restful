'use strict'
const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../configs/db.config');
const User = require('./User')
const {deleteUploadedFile} = require('../utils');

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

Story.afterUpdate(async (story, options) => {
    if(story.changed('coverImageURL')){
        const previousStory = story._previousDataValues;
        await deleteUploadedFile(previousStory.coverImageURL);
    }
});

Story.afterDestroy(async (story, options) => {
    await deleteUploadedFile(story.coverImageURL);
});

module.exports = Story;