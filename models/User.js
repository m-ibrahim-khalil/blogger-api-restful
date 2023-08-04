'use strict'
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connectDb');

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
    }
}, {sequelize});

module.exports = User;