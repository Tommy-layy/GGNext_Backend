const Router = require('express').Router()
const controller = require('../controllers/FavoriteController')

Router.get('/', controller.getFavorite)
Router.get('/:user_id', controller.getFavoriteByUser)
Router.get('/games/:favorite_id', controller.getGamesFromFavorite)
Router.post('/:user_id', controller.createFavorite)
Router.put('/:favorite_id', controller.updateFavorite)
Router.delete('/:favorite_id', controller.deleteFavorite)
Router.post('/addgame/:favorite_id/:game_id', controller.addGamesToFavorite)
Router.delete(
  '/addgame/:favorite_id/:game_id',
  controller.removeGameFromFavorite
)

module.exports = Router
