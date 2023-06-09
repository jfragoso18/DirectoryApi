// contacts.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'contacts',
});

Contact.associate = (models) => {
  Contact.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
};
return Contact; 
}
