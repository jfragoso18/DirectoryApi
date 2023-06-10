// users.js

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
      {
        tableName: 'users',
      }
    );
  
    // Before saving the user, hash the password
    User.beforeCreate(async (user) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    });
  
    // Add a method to validate the password
    User.prototype.validPassword = async function (password) {
      return await bcrypt.compare(password, this.password);
    };
  
    return User;
 
  
};
