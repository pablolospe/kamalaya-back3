const { DataTypes } = require('sequelize');

const role = {
  ADMIN:'Admin',
  USER:'User'
}
module.exports = (sequelize) => {

  sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
        // unique: true,
      },
      hashPassword: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(Object.values(role)),
      },
    },
    // {
    //   paranoid: true,
    // }
  );
};
