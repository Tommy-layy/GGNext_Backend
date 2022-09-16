const { Game, Favorite, Favorite_game } = require('../models')

const getFavorite = async (req, res) => {
  try {
    const allFavorite = await Favorite.findAll()
    res.send(allFavorite)
  } catch (error) {
    throw error
  }
}

const getFavoriteByUser = async (req, res) => {
  try {
    userId = parseInt(req.params.user_id)
    let userFavorite = await Favorite.findAll({
      where: { userId: userId }
      // include: { model: Game, as: 'games', through: { attributes: [] } }
    })
    res.send(userFavorite)
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

const createFavorite = async (req, res) => {
  console.log('hello')
  try {
    let userId = req.params.user_id
    let favoriteBody = {
      userId: userId,
      ...req.body
    }
    let create = await Favorite.create(favoriteBody)
    res.send(create)
  } catch (error) {
    throw error
  }
}

const updateFavorite = async (req, res) => {
  try {
    let favorite_id = parseInt(req.params.favorite_id)
    let newFavorite = await Favorite.update(
      { title: req.body.title },
      {
        where: {
          id: favorite_id
        },
        returning: true
      }
    )
    res.send(newFavorite)
  } catch (error) {
    throw error
  }
}

const deleteFavorite = async (req, res) => {
  try {
    let favoriteId = parseInt(req.params.favorite_id)
    await Favorite.destroy({
      where: {
        id: favoriteId
      }
    })
    res.send({ msg: 'List has been deleted!' })
  } catch (error) {
    throw error
  }
}

const addGamesToFavorite = async (req, res) => {
  try {
    let favoriteId = parseInt(req.params.playlist_id)
    let gameId = parseInt(req.params.game_id)
    let currentFavorite = await Favorite.findByPk(favoriteId, {
      include: { model: Game, as: 'games', through: { attributes: [] } }
    })
    let currentGames = currentFavorite.games
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
  createFavorite,
  updateFavorite,
  deleteFavorite,
  addGamesToFavorite,
  removeGameFromFavorite
}
