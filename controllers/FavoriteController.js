const { Game, Favorite, Favorite_game } = require('../models')

const getFavorite = async (req, res) => {
  try {
    const favList = await Favorite.findAll()
    res.send(favList)
  } catch (error) {
    throw error
  }
}

const getFavoriteByUser = async (req, res) => {
  try {
    user_Id = parseInt(req.params.user_id)
    let allFavorites = await Favorite.findAll({ where: { userId: user_Id } })
    res.send(allFavorites)
  } catch (error) {
    throw error
  }
}

const getGamesFromFavorite = async (req, res) => {
  let favoriteId = parseInt(req.params.favorite_id)
  const gameList = await Favorite.findAll({
    where: { id: favoriteId },
    include: { model: Game, as: 'games', though: { attributes: [] } }
  })
  res.send(gameList)
}

const addGamesToFavorite = async (req, res) => {
  try {
    let favoriteId = parseInt(req.params.playlist_id)
    let gameId = parseInt(req.params.game_id)
    let currentList = await Favorite.findByPk(favoriteId, {
      include: { model: Game, as: 'games', through: { attributes: [] } }
    })
    let currentGames = currentList.songs
    if (!currentGames.some((game) => game.id === gameId)) {
      let favorite_game = {
        favoriteId,
        gameId
      }
      const gameAssociation = await Favorite_song.create(favorite_game)
      res.send(gameAssociation)
    } else {
      res.send({ message: 'Game has already been added!' })
    }
  } catch (error) {
    throw error
  }
}

const removeGameFromFavorite = async (req, res) => {
  try {
    let favoriteId = parseInt(req.params.favorite_id)
    let gameId = parseInt(req.params.game_id)
    let favorite_game = await Favorite_game.findOne({
      where: { favoriteId: favoriteId, gameId: gameId }
    })
    if (favorite_game) {
      await Favorite_game.destroy({
        where: { favoriteId: favoriteId, gameId: gameId }
      })
      res.send({ message: `Game removed from favorites!` })
    } else {
      res.send({ message: `Error! Unable to remove game.` })
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getFavorite,
  getFavoriteByUser,
  getGamesFromFavorite,
  addGamesToFavorite,
  removeGameFromFavorite
}
