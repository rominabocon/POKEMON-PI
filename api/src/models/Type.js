const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('type', {
    name: { 
        type: DataTypes.STRING,

        allowNull: true,
      }
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false
    })
}

  