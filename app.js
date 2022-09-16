const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()
const FavoriteRouter = require('./routes/FavoriteRouter')
const GameRouter = require('./routes/GameRouter')
const UserRouter = require('./routes/UserRouter')

const AuthRouter = require('./routes/AuthRouter')
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/auth', AuthRouter)
app.use('/user', UserRouter)
app.use('/favorite', FavoriteRouter)
// app.use('/game', GameRouter)
app.use('/auth', AuthRouter)
app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
