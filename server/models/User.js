const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connectDb');

class User extends Model {
    static classLevelMethod() {
        return 'foo';
    }
    instanceLevelMethod() {
        return 'bar';
    }
    getFullname() {
        return [this.firstname, this.lastname].join(' ');
    }
}

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
                msg: 'Username must contain Alpha Numeric values!'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
              msg: 'Please enter your Email.'
            },
            isEmail:{
                msg: 'Email address is not valid!'
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

(async () => {
    await sequelize.sync({ force: true });
    // Code here
})();

module.exports = User;