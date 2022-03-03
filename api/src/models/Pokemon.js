const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attack: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://images.unsplash.com/photo-1638491692316-d153e886a5f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    isInDataBase: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false
    });
};
