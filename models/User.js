'use strict'
const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../configs/db.config');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
              msg: 'Please enter your username.'
            },
            isAlphanumeric: {
                msg: 'username must contain Alpha Numeric values!'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
              msg: 'Please enter your email.'
            },
            isEmail:{
                msg: 'email address is not valid!'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'Please enter your password.'
            }
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {sequelize});

module.exports = User;