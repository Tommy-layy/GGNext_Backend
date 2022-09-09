'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Favorite_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorite_game.init(
    {
      favoriteId: DataTypes.INTEGER,
      gameId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Favorite_game',
      tableName: 'favorite_games'
    }
  )
  return Favorite_game
}
