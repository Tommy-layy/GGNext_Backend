'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
      Favorite.hasMany(models.Game, {
        foreignKey: 'gameId',
        onDelete: 'CASCADE'
      })
    }
  }
  Favorite.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Favorite',
      tableName: 'favorites'
    }
  )
  return Favorite
}
