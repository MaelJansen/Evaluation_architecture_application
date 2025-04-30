const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Operation = sequelize.define("Operation", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idUtilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Operation;
